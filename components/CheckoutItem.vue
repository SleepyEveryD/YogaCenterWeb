<template>
  <div class="flex justify-start my-2">
    <!-- ✅ 固定图片大小为 150x85，居中裁剪填满 -->
    <div class="shrink-0 w-[150px] h-[85px] rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
      <img
          :src="product.image"
          class="w-full h-full object-cover"
          alt="Product image"
      />
    </div>

    <div class="overflow-hidden pl-2">
      <div class="flex items-center">
        <span
            v-if="product.oldPrice"
            class="bg-[#FD374F] text-white text-[9px] font-semibold px-1.5 rounded-sm min-w-[50px]"
        >
          Discount
        </span>
        <div class="truncate sm:pl-2 font-bold">{{ product.name }}</div>
      </div>

      <div class="text-xl space-x-1">
        <span :class="[ product.oldPrice ? 'text-red-500' : 'text-black']">
          ${{ product.price }}
        </span>
        <span
            v-if="product.oldPrice"
            class="text-gray-500 text-sm text-light line-through"
        >
          ${{ product.oldPrice }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['product'])
const { product } = toRefs(props)
</script>
