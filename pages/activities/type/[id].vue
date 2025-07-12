<template>
  <div class="container">
    <div id="IndexPage" class="mt-4 max-w-[1200px] mx-auto px-2">
      <div class="grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-4">
        <div v-for="activity in typeactivity" :key="activity.id">
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

// ✅ 封装类型安全的 $fetch 调用，避免 stack depth 错误
function useTypedFetch<T>(url: string, options = {}) {
  return $fetch<T>(url as string, options)
}

// ✅ 定义类型
interface Teacher {
  id: string
  name: string
  surname: string
  img: string | null
}

interface Activity {
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

// ✅ 加载对应类型的活动
const { data: typeactivity, pending, error } = await useAsyncData<Activity[]>(
    `activities-${route.params.id}`,
    () => useTypedFetch<Activity[]>(`/api/activities/type/${route.params.id}`)
)
</script>
