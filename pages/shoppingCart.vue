<!-- pages/shoppingCart.vue -->
<template>
  <div id="ShoppingCartPage" class="mt-4 max-w-[1200px] mx-auto px-2 min-h-[calc(100vh-200px)]">
    <!-- 加载状态 -->
    <div v-if="loading" class="h-[500px] flex items-center justify-center">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#48A6A7]"></div>
    </div>

    <!-- 空购物车状态 -->
    <div v-else-if="!userStore.cart.length" class="h-[500px] flex items-center justify-center">
      <div class="pt-20 text-center">
        <img class="mx-auto" width="250" src="/cart-empty.png" alt="Empty cart" />
        <div class="text-xl text-center mt-4">No items yet?</div>
        <div v-if="!user" class="flex text-center">
          <NuxtLink
              to="/auth"
              class="bg-[#48A6A7] w-full text-white text-[21px] font-semibold p-1.5 rounded-full mt-4 py-2"
          >
            Sign in
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- 正常购物车状态 -->
    <div v-else class="md:flex gap-4 justify-between mx-auto w-full">
      <!-- 左侧商品列表 -->
      <div class="md:w-[65%]">
        <div class="bg-white rounded-lg p-4">
          <div class="text-2xl font-bold mb-2">
            Shopping Cart ({{ userStore.cart.length }})
          </div>
        </div>

        <div id="Items" class="bg-white rounded-lg p-4 mt-4">
          <div v-for="product in userStore.cart" :key="product.id">
            <CartItem
                :product="product"
                :selectedArray="selectedArray"
                @selectedRadio="selectedRadioFunc"
            />
          </div>
        </div>
      </div>

      <!-- 右侧结算信息 -->
      <div class="md:hidden block my-4" />
      <div class="md:w-[35%]">
        <div id="Summary" class="bg-white rounded-lg p-4 sticky top-4">
          <div class="text-2xl font-extrabold mb-2">Summary</div>
          <div class="flex items-center justify-between my-4">
            <div class="font-semibold">Total</div>
            <div class="text-2xl font-semibold">
              $ <span class="font-extrabold">{{ totalPriceComputed }}</span>
            </div>
          </div>
          <button
              @click="goToCheckout"
              class="flex items-center justify-center bg-[#FD374F] w-full text-white text-[21px] font-semibold p-1.5 rounded-full mt-4 hover:bg-red-600 transition-colors"
          >
            Checkout
          </button>
        </div>

        <div id="PaymentProtection" class="bg-white rounded-lg p-4 mt-4">
          <div class="text-lg font-semibold mb-2">Payment methods</div>
          <div class="flex items-center justify-start gap-8 my-4">
            <div v-for="card in cards" :key="card" class="flex items-center">
              <img
                  class="max-h-6 w-auto object-contain"
                  :src="card"
                  :alt="card.replace('.png', '')"
              />
            </div>
          </div>

          <div class="border-b" />
          <div class="text-lg font-semibold mb-2 mt-2">Buyer Protection</div>
          <p class="my-2">
            Get full refund if the item is not as described or if is not delivered
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '~/stores/user'
const userStore = useUserStore()
const user = useSupabaseUser()

const loading = ref(true)
const selectedArray = ref([])
const cards = ref(['visa.png', 'mastercard.png', 'paypal.png', 'applepay.png'])

// 加载购物车数据
const loadCartData = async () => {
  try {
    loading.value = true
    await userStore.fetchCart()
    // 初始化选中状态
    selectedArray.value = [...userStore.cart.map(item => toRaw(item))]
  } catch (error) {
    console.error('Failed to load cart:', error)
  } finally {
    loading.value = false
  }
}

// 组件挂载时加载数据
onMounted(() => {
  loadCartData()
})

// 如果用户状态变化，重新加载数据
watch(() => user.value, () => {
  loadCartData()
})

const totalPriceComputed = computed(() => {
  return selectedArray.value.reduce((sum, item) => sum + (item.price || 0), 0).toFixed(2)
})

const selectedRadioFunc = (product) => {
  const index = selectedArray.value.findIndex((item) => item.id === product.id)
  if (index === -1) {
    selectedArray.value.push(product)
  } else {
    selectedArray.value.splice(index, 1)
  }
}

const goToCheckout = () => {
  if (!selectedArray.value.length) {
    alert('Please select at least one item to checkout')
    return
  }
  userStore.checkout = selectedArray.value.map(item => toRaw(item))
  return navigateTo('/checkout')
}
</script>

<style scoped>
/* 防止布局偏移 */
img {
  display: block;
  background: #f5f5f5;
  max-width: 100%;
  height: auto;
}

/* 平滑过渡 */
#Summary {
  transition: all 0.3s ease;
}
</style>