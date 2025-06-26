import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => ({
        cart: [],
        checkout: [],
        isLoading: false
    }),
    actions: {
        async mergeCartAfterLogin(userId, client) {
            // 正确表名和字段名
            const { data: serverCart, error } = await client
                .from('carts')
                .select('*')
                .eq('user_id', userId)

            if (error) {
                console.error('获取服务器购物车失败', error)
                return
            }

            console.log('服务器购物车:', serverCart)

            // 筛选出本地有但服务器没有的课程
            const toInsert = this.cart
                .filter(localItem => {
                    return !serverCart.some(serverItem => serverItem.course_id === localItem.id)
                })
                .map(item => ({
                    user_id: userId,
                    course_id: item.id,
                    quantity: item.quantity,
                    price: item.price  // ⚠️ 你前端必须包含课程价格
                }))

            if (toInsert.length > 0) {
                const { error: insertError } = await client
                    .from('carts')
                    .insert(toInsert)

                if (insertError) {
                    console.error('上传本地购物车失败', insertError)
                }
            }

            // 用服务器购物车覆盖前端状态
            this.cart = serverCart.map(item => ({
                id: item.course_id,
                quantity: item.quantity,
                price: item.price  // 方便前端展示
            }))
        },

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
        }
    },
    persist: {
        paths: ['cart', 'checkout']  // ✅ 只持久化这两个字段
    }
})
