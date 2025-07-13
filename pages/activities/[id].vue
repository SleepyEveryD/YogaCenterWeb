// pages/activities/[id].vue
<template>
  <!-- 外层容器：响应式分栏布局 -->
  <div class="flex flex-col md:flex-row gap-4 md:gap-8 p-4 md:p-8 max-w-7xl mx-auto">

    <!-- 左边栏：图片 + 教师头像 -->
    <div class="md:w-2/5 w-full space-y-4 md:space-y-6">

      <!-- 课程图片 -->
      <div class="relative w-full">
        <!-- 主图 -->
        <img
            :src="selectedImg"
            alt="Activity image"
            class="w-full h-[250px] md:h-[400px] object-cover rounded-xl shadow-lg"
        />

        <!-- 缩略图条 -->
        <div
            class="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 py-1  "
        >
          <div
              v-for="(thumb, index) in activity.image"
              :key="index"
              class="w-[56px] h-[40px] overflow-hidden rounded border-2 transition-transform duration-200 hover:scale-110 cursor-pointer"
              :class="{
          'border-white': thumb === selectedImg,
          'border-transparent': thumb !== selectedImg
        }"
              @click="selectedImg = thumb"
          >
            <img
                :src="thumb"
                alt="Thumbnail"
                class="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </div>

      <!-- 教师头像滚动区 -->
      <div class="overflow-x-auto pb-2 px-2">
        <div class="flex flex-nowrap gap-3 md:gap-4">
          <div
              v-for="teach in activity.Teach"
              :key="teach.Teacher.id"
              :to="`/teachers/${teach.Teacher.id}`"
              class="flex-shrink-0 transition-transform hover:-translate-y-1"
          >
            <TeacherAvatar
                :teacher="teach.Teacher"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- 右边栏：课程信息 -->
    <div class="md:w-3/5 w-full space-y-4 md:space-y-6">

      <!-- 标题 -->
      <h1 class="text-2xl md:text-3xl font-bold text-gray-800">
        {{ activity.name }}
      </h1>

      <!-- 描述 -->
      <div class="text-gray-600 leading-relaxed space-y-3">
        <p class="text-base md:text-lg">
          {{ activity.description }}
        </p>
        <p class="whitespace-pre-line text-base md:text-lg pl-4">
          {{ formattedSchedule }}
        </p>
      </div>

      <!-- price and cart -->
      <div class="flex items-center justify-start gap-3 px-1 ">
        <span :class="['font-semibold text-xl', activity.oldPrice ? 'text-red-500' : 'text-black']">$ {{ activity.price }}</span>
        <span
            v-if="activity.oldPrice"
            class="text-gray-500 text-s text-light line-through">${{ activity.oldPrice }}</span>
        <span class="bg-[#F5F5F5] border text-[#C08562] text-[9px] font-semibold px-1.5 rounded-sm ">{{activityPricePercentage}}% off</span>

      </div>


      <div class="py-2"/>

      <div class="flex items-center justify-start gap-2 my-2">
        <!-- cart and buy button -->

        <button
            @click="buyNow()"
            class="
                            px-6
                            py-2
                            rounded-lg
                            text-white
                            text-lg
                            font-semibold
                            bg-[#006A71]
                            cursor-pointer
                        "
        >
          <div>Buy Now</div>
        </button>
        <button
            @click="addToCart"
            class="px-6 py-2 text-[#006A71] text-lg font-semibold cursor-pointer"
        >
          <Icon name="heroicons:shopping-cart" class="w-6 h-6" />
        </button>
      </div>






    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useUserStore } from '~/stores/user'

const userStore = useUserStore()
const route = useRoute()
const loading = ref(true)



// 1. 使用 useAsyncData 处理异步数据
const { data: activity } = await useAsyncData(
    `activity-${route.params.id}`,
    () => $fetch(`/api/activities/${route.params.id}`)
)
const formattedSchedule = computed(() => {
  if (!activity.value?.schedule) return ''

  // 在每个星期几前添加换行符
  return activity.value.schedule
      .replace(/(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)/g, '\n‣ $1')
      .trim()
})

// 2. 确保数据存在后再计算百分比
const activityPricePercentage = computed(() => {
  if (!activity.value?.oldPrice) return 0
  return ((activity.value.oldPrice - activity.value.price) / activity.value.oldPrice * 100).toFixed(0)
})

// 3. 安全设置默认图片
const selectedImg = ref(activity.value?.img?.[0] || '/default-image.jpg')

// 4. 优化购物车逻辑
const addToCart = () => {
  if (!activity.value) return

  const item = {
    id: activity.value.id,
    name: activity.value.name,
    price: activity.value.price,
    oldPrice: activity.value.oldPrice,
    image: activity.value.img?.[0] || '/default-image.jpg',
    quantity: 1
  }

  const existingIndex = userStore.cart.findIndex(i => i.id === item.id)

  if (existingIndex !== -1) {
    // 创建新数组确保响应式更新
    const updatedCart = [...userStore.cart]
    updatedCart[existingIndex].quantity += 1
    userStore.cart = updatedCart
  } else {
    userStore.cart = [...userStore.cart, item]
  }
}

const buyNow = () => {
  addToCart()
  navigateTo('/checkout')
}
</script>




<script>
export default {
  computed: {
    BCrumbs() {
      return [
        {
          label: "home",
          url: "/",
        },
        {
          label: "our team",
          url: "/our_team",
        },
      ];
    },
  },
};
</script>

