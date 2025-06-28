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
        async mergeCartAfterLogin(userId, client) {
            // 正确表名和字段名
            const {data: serverCart, error} = await client
                .from('carts')
                .select('*')
                .eq('user_id', userId)

            if (error) {
                console.error('获取服务器购物车失败', error)
                return
            }
            console.log('item need to be inserted:', serverCart)

            // 筛选出本地有但服务器没有的课程
            const toInsert = this.cart
                .filter(localItem => {
                    console.log('local item:', localItem)
                    return !serverCart.some(serverItem => serverItem.course_id === localItem.id)
                })
                .map(item => ({
                    user_id: userId,
                    course_id: item.id,
                    quantity: item.quantity,
                }))

            if (toInsert.length > 0) {
                const {error: insertError} = await client
                    .from('carts')
                    .insert(toInsert)

                if (insertError) {
                    console.error('上传本地购物车失败', insertError)
                }
            }

            const courseIds = serverCart.map(item => item.course_id)

            if (courseIds.length === 0) {
                this.cart = []
                return
            }

            // 查询 Course 表，获取完整课程信息
            const {data: courseInfos, error: courseError} = await client
                .from('Course')
                .select('*')
                .in('id', courseIds)

            if (courseError) {
                console.error('获取课程信息失败:', courseError)
                return
            }

            // 合并课程信息和购物车信息
            this.$patch(state => {
                state.cart = serverCart.map(item => {
                    const course = courseInfos.find(c => c.id === item.course_id)
                    return {
                        id: item.course_id,
                        quantity: item.quantity,
                        price: item.price,
                        ...course
                    }
                })
            })


        },
    },
    persist: {
        paths: ['cart', 'checkout']  // ✅ 只持久化这两个字段
    }
})