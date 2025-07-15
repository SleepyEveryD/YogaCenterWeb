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
                this.cart.push({...product, quantity: product.quantity || 1})
            }
        },
        clearCart() {
            this.cart = []
        },
        async fetchCart(userId = null, client = null) {
            this.isLoading = true
            try {
                // 如果未登录，直接返回本地购物车
                if (!userId || !client) {
                    this.isLoading = false
                    return
                }

                // 获取服务器购物车数据
                const { data: serverCart, error } = await client
                    .from('carts')
                    .select('*')
                    .eq('user_id', userId)

                if (error) throw error

                // 如果有服务器购物车数据，则合并
                if (serverCart && serverCart.length > 0) {
                    await this.mergeCartAfterLogin(userId, client)
                } else if (this.cart.length > 0) {
                    // 如果服务器没有购物车数据，但本地有，则上传本地购物车
                    const toInsert = this.cart.map(item => ({
                        user_id: userId,
                        course_id: item.id,
                        quantity: item.quantity,
                    }))

                    const { error: insertError } = await client
                        .from('carts')
                        .insert(toInsert)

                    if (insertError) throw insertError
                }
            } catch (error) {
                console.error('购物车操作失败:', error)
                // 即使出错也继续使用本地购物车
            } finally {
                this.isLoading = false
            }
        },
        async mergeCartAfterLogin(userId, client) {
            try {
                // 获取服务器购物车
                const { data: serverCart, error } = await client
                    .from('carts')
                    .select('*')
                    .eq('user_id', userId)

                if (error) throw error

                // 获取服务器购物车中的课程ID
                const courseIds = serverCart.map(item => item.course_id)

                // 查询完整课程信息
                const { data: courseInfos, error: courseError } = await client
                    .from('Course')
                    .select('*')
                    .in('id', courseIds)

                if (courseError) throw courseError

                // 转换服务器购物车格式
                const serverCartFormatted = serverCart.map(item => {
                    const course = courseInfos.find(c => c.id === item.course_id)
                    return {
                        id: item.course_id,
                        quantity: item.quantity,
                        price: item.price || course?.price || 0,
                        image: Array.isArray(course?.img) ? course.img[0] : course?.img || null,
                        ...course
                    }
                })

                // 合并购物车
                const mergedMap = new Map()

                // 添加本地购物车项
                this.cart.forEach(item => {
                    mergedMap.set(item.id, { ...item })
                })

                // 合并服务器购物车项
                serverCartFormatted.forEach(item => {
                    if (mergedMap.has(item.id)) {
                        const localItem = mergedMap.get(item.id)
                        mergedMap.set(item.id, {
                            ...item,
                            quantity: Math.max(localItem.quantity, item.quantity),
                            price: item.price || localItem.price // 优先使用服务器价格
                        })
                    } else {
                        mergedMap.set(item.id, { ...item })
                    }
                })

                // 更新购物车状态
                this.cart = Array.from(mergedMap.values())

                // 更新服务器购物车
                const updates = Array.from(mergedMap.values()).map(item => ({
                    user_id: userId,
                    course_id: item.id,
                    quantity: item.quantity,
                    price: item.price
                }))

                // 先删除旧的
                await client.from('carts').delete().eq('user_id', userId)

                // 再插入新的
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