<!-- pages/shoppingCart.vue -->
<template>
  <div id="ShoppingCartPage" class="mt-4 max-w-[1200px] mx-auto px-2">
    <div v-if="!userStore.cart.length" class="h-[500px] flex items-center justify-center">
      <div class="pt-20 items-center">
        <img class="mx-auto" width="250" src="/cart-empty.png" />
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

    <div v-else class="md:flex gap-4 justify-between mx-auto w-full">
      <!-- Left: Items -->
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

      <!-- Right: Summary -->
      <div class="md:hidden block my-4" />
      <div class="md:w-[35%]">
        <div id="Summary" class="bg-white rounded-lg p-4">
          <div class="text-2xl font-extrabold mb-2">Summary</div>
          <div class="flex items-center justify-between my-4">
            <div class="font-semibold">Total</div>
            <div class="text-2xl font-semibold">
              $ <span class="font-extrabold">{{ totalPriceComputed }}</span>
            </div>
          </div>
          <button
              @click="goToCheckout"
              class="flex items-center justify-center bg-[#FD374F] w-full text-white text-[21px] font-semibold p-1.5 rounded-full mt-4"
          >
            Checkout
          </button>
        </div>

        <div id="PaymentProtection" class="bg-white rounded-lg p-4 mt-4">
          <div class="text-lg font-semibold mb-2">Payment methods</div>
          <div class="flex items-center justify-start gap-8 my-4">
            <div v-for="card in cards" :key="card">
              <img class="h-6" :src="card" />
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

const selectedArray = ref([])

onMounted(() => {
  setTimeout(() => (userStore.isLoading = false), 200)
  // ✅ 默认全选购物车中的商品
  selectedArray.value = userStore.cart.map((item) => toRaw(item))
})

const cards = ref(['visa.png', 'mastercard.png', 'paypal.png', 'applepay.png'])

const totalPriceComputed = computed(() => {
  return selectedArray.value.reduce((sum, item) => sum + (item.price || 0), 0)
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
  userStore.checkout = selectedArray.value.map((item) => toRaw(item))
  return navigateTo('/checkout')
}
</script>
