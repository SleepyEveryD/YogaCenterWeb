import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => ({
        cart: [],
        checkout: [],
        isLoading: false
    }),
    actions: {
        addToCart(product) {
            const existingItem = this.cart.find(i => i.id === product.id)
            if (existingItem) {
                existingItem.quantity += product.quantity || 1
            } else {
                this.cart.push({ ...product, quantity: product.quantity || 1 })
            }
        },
        clearCart() {
            this.cart = []
        },
        async fetchCart(userId = null, client = null) {
            this.isLoading = true
            try {
                if (!userId || !client) {
                    this.isLoading = false
                    return
                }

                const { data: serverCart, error } = await client
                    .from('carts')
                    .select('*')
                    .eq('user_id', userId)

                if (error) throw error

                if (serverCart && serverCart.length > 0) {
                    await this.mergeCartAfterLogin(userId, client)
                } else if (this.cart.length > 0) {
                    const toInsert = this.cart.map(item => ({
                        user_id: userId,
                        course_id: item.id,
                        quantity: item.quantity
                        // ✅ 去掉 price
                    }))

                    const { error: insertError } = await client
                        .from('carts')
                        .insert(toInsert)

                    if (insertError) throw insertError
                }
            } catch (error) {
                console.error('购物车操作失败:', error)
            } finally {
                this.isLoading = false
            }
        },
        async mergeCartAfterLogin(userId, client) {
            try {
                const { data: serverCart, error } = await client
                    .from('carts')
                    .select('*')
                    .eq('user_id', userId)

                if (error) throw error

                const courseIds = serverCart.map(item => item.course_id)

                const { data: courseInfos, error: courseError } = await client
                    .from('Course')
                    .select('*')
                    .in('id', courseIds)

                if (courseError) throw courseError

                const serverCartFormatted = serverCart.map(item => {
                    const course = courseInfos.find(c => c.id === item.course_id)
                    return {
                        id: item.course_id,
                        quantity: item.quantity,
                        price: course?.price || 0, // ✅ 从 Course 表补充价格
                        image: Array.isArray(course?.img) ? course.img[0] : course?.img || null,
                        ...course
                    }
                })

                const mergedMap = new Map()

                this.cart.forEach(item => {
                    mergedMap.set(item.id, { ...item })
                })

                serverCartFormatted.forEach(item => {
                    if (mergedMap.has(item.id)) {
                        const localItem = mergedMap.get(item.id)
                        mergedMap.set(item.id, {
                            ...item,
                            quantity: Math.max(localItem.quantity, item.quantity),
                            price: item.price || localItem.price
                        })
                    } else {
                        mergedMap.set(item.id, { ...item })
                    }
                })

                this.cart = Array.from(mergedMap.values())

                // ✅ 准备上传的数据：不包含 price
                const updates = this.cart.map(item => ({
                    user_id: userId,
                    course_id: item.id,
                    quantity: item.quantity
                }))

                await client.from('carts').delete().eq('user_id', userId)

                const { error: upsertError } = await client
                    .from('carts')
                    .insert(updates)

                if (upsertError) throw upsertError

            } catch (error) {
                console.error('合并购物车失败:', error)
                throw error
            }
        }
    },
    persist: {
        paths: ['cart']
    }
})
