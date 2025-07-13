<template>
  <div class="container">
    <div>
      <!-- 使用获取到的typeDescription作为副标题 -->
      <PageTitle :short-description="typeDescription" :title="typeName" />
    </div>
    <div id="IndexPage" class="mt-4 max-w-[1200px] mx-auto px-2">
      <div class="grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-4">
        <!-- 遍历courses数据 -->
        <div v-for="activity in courses" :key="activity.id">
          <ActivityComponent :activity="activity" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '~/stores/user'
import { useRoute } from 'vue-router'

const userStore = useUserStore()
const route = useRoute()

// 简化类型定义
type Teacher = {
  id: string
  name: string
  surname: string
  img: string | null
}

type Activity = {
  id: string
  name: string
  description: string
  Type: string
  img: string | null
  star: boolean
  Teach: {
    Teacher: Teacher
  } | null
  price: number
  oldPrice: number | null
}

// 使用更简单的类型定义
type ApiData = {
  courses?: Activity[]
  typeDescription?: string
  typeName?: string
}

const typeName = ref(route.params.id as string)
const typeDescription = ref('')

// 使用更宽松的类型定义
const { data: apiResponse } = await useAsyncData(
    `activities-data-${route.params.id}`,
    () => $fetch(`/api/activities/type/${route.params.id}`) as Promise<ApiData>
)

const courses = computed(() => apiResponse.value?.courses || [])

watchEffect(() => {
  if (apiResponse.value) {
    typeName.value = apiResponse.value.typeName || route.params.id as string
    typeDescription.value = apiResponse.value.typeDescription || ''
  }
})
</script>