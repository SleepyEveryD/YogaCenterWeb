import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => ({
        isMenuOverlay: false,
        isLoading: false,
        cart: [],
        checkout: []
    }),
    actions: {
        // 初始化购物车（客户端）
        initCart() {
            if (process.client && localStorage.getItem('pinia-user-cart')) {
                try {
                    this.cart = JSON.parse(localStorage.getItem('pinia-user-cart'))
                } catch (e) {
                    console.error('解析购物车数据失败:', e)
                    this.clearCart()
                }
            }
        },

        // 添加商品到购物车
        addToCart(product) {
            const existingItem = this.cart.find(item => item.id === product.id)
            if (existingItem) {
                existingItem.quantity += product.quantity || 1
            } else {
                this.cart.push({
                    ...product,
                    quantity: product.quantity || 1
                })
            }
            this.saveCart()
        },

        // 保存购物车到本地存储
        saveCart() {
            if (process.client) {
                localStorage.setItem('pinia-user-cart', JSON.stringify(this.cart))
            }
        },

        // 清空购物车
        clearCart() {
            this.cart = []
            if (process.client) {
                localStorage.removeItem('pinia-user-cart')
            }
        }
    }
})