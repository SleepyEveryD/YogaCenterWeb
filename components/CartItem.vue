<template>
  <div class="flex justify-start my-2">
    <div class="my-auto">
      <div
          @mouseenter="isHover = true"
          @mouseleave="isHover = false"
          class="flex items-center justify-start p-0.5 cursor-pointer"
      >
        <!-- ✅ 自定义圆形勾选框 -->
        <div
            @click="toggleSelect"
            class="flex items-center justify-center h-[20px] w-[20px] rounded-full border mr-5 ml-2"
            :class="[
            isHover ? 'border-[#FD374F]' : 'border-gray-300',
            isSelected ? 'bg-[#FD374F]' : ''
          ]"
        >
          <div v-if="isSelected" class="h-[8px] w-[8px] rounded-full bg-white" />
        </div>
      </div>
    </div>

    <img class="rounded-md md:w-[150px] w-[90px]" :src="product.image" />

    <div class="overflow-hidden pl-2 w-full">
      <div class="flex items-center justify-between w-full">
        <div class="flex items-center justify-between truncate">
          <span
              v-if="product.oldPrice"
              class="sm:block hidden bg-[#FD374F] text-white text-[9px] font-semibold px-1.5 rounded-sm min-w-[50px] content-center"
          >Discount</span>
          <div class="truncate sm:pl-2 font-bold">{{ product.name }}</div>
        </div>
        <button
            @click="removeFromCart()"
            class="mx-3 sm:block hidden -mt-0.5 hover:text-red-500"
        >
          <Icon name="material-symbols:delete-outline" size="20" />
        </button>
      </div>

      <div class="text-xl space-x-1">
        <span :class="[product.oldPrice ? 'text-red-500' : 'text-black']">
          ${{ product.price }}
        </span>
        <span
            v-if="product.oldPrice"
            class="text-gray-500 text-sm text-light line-through"
        >
          ${{ product.oldPrice }}
        </span>
      </div>

      <div class="flex items-center justify-end">
        <button
            @click="removeFromCart()"
            class="sm:hidden block -mt-0.5 hover:text-red-500"
        >
          <Icon name="material-symbols:delete-outline" size="20" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '~/stores/user'
const userStore = useUserStore()

const props = defineProps(['product', 'selectedArray'])
const { product, selectedArray } = toRefs(props)
const emit = defineEmits(['selectedRadio'])

const isHover = ref(false)

// ✅ 是否被勾选：根据 selectedArray 判断
const isSelected = computed(() => {
  return selectedArray.value.some((item) => item.id === product.value.id)
})

// ✅ 点击切换勾选状态
const toggleSelect = () => {
  emit('selectedRadio', product.value)
}

// ✅ 移除商品
const removeFromCart = () => {
  userStore.cart = userStore.cart.filter((prod) => prod.id !== product.value.id)
}
</script>
