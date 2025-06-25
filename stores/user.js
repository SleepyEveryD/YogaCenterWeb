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
        }
    },
    persist: {
        paths: ['cart', 'checkout']  // ✅ 只持久化这两个字段
    }
})
