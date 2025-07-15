import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => ({
        cart: [],       // 本地购物车，包含完整商品信息
        checkout: [],   // 结算列表
        isLoading: false
    }),
    actions: {
        // 添加商品到本地购物车
        addToCart(product) {
            const existingItem = this.cart.find(i => i.id === product.id)
            if (existingItem) {
                existingItem.quantity += product.quantity || 1
            } else {
                this.cart.push({
                    ...product,
                    quantity: product.quantity || 1
                })
            }
        },

        // 清空购物车
        clearCart() {
            this.cart = []
        },

        // 获取购物车数据
        async fetchCart(userId = null, client = null) {
            this.isLoading = true
            try {
                // 未登录用户直接返回本地购物车
                if (!userId || !client) {
                    this.isLoading = false
                    return
                }

                // 获取服务器购物车数据（只包含course_id和quantity）
                const { data: serverCart, error } = await client
                    .from('carts')
                    .select('course_id, quantity')
                    .eq('user_id', userId)

                if (error) throw error

                // 合并服务器和本地购物车
                if (serverCart && serverCart.length > 0) {
                    await this.mergeCartAfterLogin(userId, client)
                } else if (this.cart.length > 0) {
                    // 上传本地购物车到服务器（不传price）
                    const toInsert = this.cart.map(item => ({
                        user_id: userId,
                        course_id: item.id,
                        quantity: item.quantity
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

        // 登录后合并购物车
        async mergeCartAfterLogin(userId, client) {
            try {
                // 获取服务器购物车基础数据
                const { data: serverCart, error } = await client
                    .from('carts')
                    .select('course_id, quantity')
                    .eq('user_id', userId)

                if (error) throw error

                // 获取课程完整信息
                const courseIds = [
                    ...new Set([
                        ...serverCart.map(item => item.course_id),
                        ...this.cart.map(item => item.id)
                    ])
                ]

                const { data: courseInfos, error: courseError } = await client
                    .from('Course')
                    .select('*')
                    .in('id', courseIds)

                if (courseError) throw courseError

                // 创建课程信息映射表
                const courseMap = new Map(courseInfos.map(course => [course.id, course]))

                // 合并策略：
                // 1. 保留本地购物车中的完整商品信息
                // 2. 合并服务器购物车中的数量
                const mergedCart = this.cart.map(localItem => {
                    const serverItem = serverCart.find(s => s.course_id === localItem.id)
                    return {
                        ...localItem,
                        quantity: serverItem
                            ? Math.max(localItem.quantity, serverItem.quantity)
                            : localItem.quantity
                    }
                })

                // 添加服务器有但本地没有的商品
                serverCart.forEach(serverItem => {
                    if (!mergedCart.some(item => item.id === serverItem.course_id)) {
                        const course = courseMap.get(serverItem.course_id)
                        if (course) {
                            mergedCart.push({
                                ...course,
                                id: course.id,
                                quantity: serverItem.quantity
                            })
                        }
                    }
                })

                // 更新本地购物车
                this.cart = mergedCart

                // 同步到服务器（只同步course_id和quantity）
                const updates = mergedCart.map(item => ({
                    user_id: userId,
                    course_id: item.id,
                    quantity: item.quantity
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
        paths: ['cart']  // 持久化本地购物车
    }
})