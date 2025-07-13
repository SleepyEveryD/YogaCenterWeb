<template>
  <div class="container">
    <div>
      <PageTitle :short-description="typeDescription" :title="typeName" />
    </div>
    <div id="IndexPage" class="mt-4 max-w-[1200px] mx-auto px-2">
      <div class="grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-4">
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

// 基础类型定义
interface Teacher {
  id: string
  name: string
  surname: string
  img: string | null
}

interface ActivityBase {
  id: string
  name: string
  description: string
  Type: string
  img: string | null
  star: boolean
  price: number
  oldPrice: number | null
  schedule: string
}

interface Activity extends ActivityBase {
  Teach: {
    Teacher: Teacher | null
  } | null
}

// API响应类型（简化版）
interface ActivitiesApiResponse {
  courses: Activity[]
  typeDescription: string
  typeName: string
}

const typeName = ref<string>(route.params.id.toString())
const typeDescription = ref<string>('')

// 使用类型断言解决递归问题
const { data: apiResponse } = await useAsyncData(
    `activities-data-${route.params.id}`,
    () => $fetch(`/api/activities/type/${route.params.id}`).then(res => ({
      courses: (res as any)?.courses || [],
      typeDescription: (res as any)?.typeDescription || '',
      typeName: (res as any)?.typeName || route.params.id.toString()
    }))
)

const courses = computed(() => apiResponse.value?.courses || [])

watchEffect(() => {
  if (apiResponse.value) {
    typeName.value = apiResponse.value.typeName
    typeDescription.value = apiResponse.value.typeDescription
  }
})
</script>