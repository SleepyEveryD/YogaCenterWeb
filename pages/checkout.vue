<template>
  <div id="CheckoutPage" class="mt-4 max-w-[1200px] mx-auto px-2">
    <div class="md:flex gap-4 justify-between mx-auto w-full">
      <div class="md:w-[65%]">
        <div id="Items" class="bg-white rounded-lg p-4">
          <div v-for="product in userStore.checkout">
            <CheckoutItem :product="product" />
          </div>
        </div>
      </div>

      <div class="md:hidden block my-4"/>
      <div class="md:w-[35%]">
        <div id="PlaceOrder" class="bg-white rounded-lg p-4">
          <div class="text-2xl font-extrabold mb-2">Summary</div>


          <div class="border-t" />

          <div class="flex items-center justify-between my-4">
            <div class="font-semibold">Total</div>
            <div class="text-2xl font-semibold">
              $ <span class="font-extrabold">{{ total }}</span>
            </div>
          </div>

          <form @submit.prevent="pay()">
            <div
                class="border border-gray-500 p-2 rounded-sm"
                id="card-element"
            />

            <p
                id="card-error"
                role="alert"
                class="text-red-700 text-center font-semibold"
            />

            <button
                :disabled="isProcessing"
                type="submit"
                class="
                  mt-4
                  bg-gradient-to-r
                  from-[#FE630C]
                  to-[#FF3200]
                  w-full
                  text-white
                  text-[21px]
                  font-semibold
                  p-1.5
                  rounded-full
                  cursor-pointer
                "
                :class="isProcessing ? 'opacity-70' : 'opacity-100'"
            >
              <Icon v-if="isProcessing" name="eos-icons:loading" />
              <div v-else>Place order</div>
            </button>
          </form>
        </div>

        <div class="bg-white rounded-lg p-4 mt-4">
          <div class="text-lg font-semibold mb-2 mt-2">YogaCenter</div>
          <p class="my-2">
            YogaCenter keeps your information and payment safe
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '~/stores/user';
const userStore = useUserStore()
const user = useSupabaseUser()
const route = useRoute()

definePageMeta({ middleware: "auth" })

let stripe = null
let elements = null
let card = null
let form = null
let total = ref(0)
let clientSecret = null
let isProcessing = ref(false)

onBeforeMount(async () => {
  if (userStore.checkout.length < 1) {
    return navigateTo('/shoppingcart')
  }
})

watchEffect(() => {
  if (route.fullPath == '/checkout' && !user.value) {
    return navigateTo('/auth')
  }
})

onMounted(async () => {
  isProcessing.value = true
  userStore.checkout.forEach(item => {
    total.value += item.price
  })
})

watch(() => total.value, () => {
  if (total.value > 0) {
    stripeInit()
  }
})

const stripeInit = async () => {
  const runtimeConfig = useRuntimeConfig()
  stripe = Stripe("pk_test_51RdXzM09jgJoUN2h9m0Zldt2FhrMbW68VzEdmdyseqzLeqTPUjvd7UMsGoLmXjxmQQVl86tNmHZSgVBSB3eu0MBS00qKorwOb5");


  let res = await $fetch('/api/stripe/paymentintent', {
    method: 'POST',
    body: {
      amount: total.value,
    }
  })
  clientSecret = res.client_secret

  elements = stripe.elements();
  var style = {
    base: {
      fontSize: "18px",
    },
    invalid: {
      fontFamily: 'Arial, sans-serif',
      color: "#EE4B2B",
      iconColor: "#EE4B2B"
    }
  };
  card = elements.create("card", {
    hidePostalCode: true,
    style: style
  });

  card.mount("#card-element");
  card.on("change", function (event) {
    document.querySelector("button").disabled = event.empty;
    document.querySelector("#card-error").textContent = event.error ? event.error.message : "";
  });

  isProcessing.value = false
}

const pay = async () => {
  isProcessing.value = true

  let result = await stripe.confirmCardPayment(clientSecret, {
    payment_method: { card: card },
  })

  if (result.error) {
    showError(result.error.message);
    isProcessing.value = false
  } else {
    await createOrder(result.paymentIntent.id)
    userStore.cart = []
    userStore.checkout = []
    setTimeout(() => {
      return navigateTo('/success')
    }, 500)
  }
}

const createOrder = async (stripeId) => {
  await useFetch('/api/prisma/create-order', {
    method: "POST",
    body: {
      userId: user.value.id,
      stripeId: stripeId,
      products: userStore.checkout
    }
  })
}

const showError = (errorMsgText) => {
  let errorMsg = document.querySelector("#card-error");
  errorMsg.textContent = errorMsgText;
  setTimeout(() => { errorMsg.textContent = "" }, 4000);
};
</script>