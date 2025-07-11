<template>
  <nav class="text-sm text-gray-600 py-2">
    <ul class="flex gap-2 items-center">
      <li>
        <NuxtLink to="/" class="hover:underline text-blue-600">Home</NuxtLink>
      </li>
      <li
          v-for="(crumb, index) in breadcrumbs"
          :key="index"
          class="flex items-center gap-2"
      >
        <span>/</span>
        <NuxtLink
            v-if="crumb.link"
            :to="crumb.link"
            class="hover:underline text-blue-600"
        >
          {{ crumb.label }}
        </NuxtLink>
        <span v-else>{{ crumb.label }}</span>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

// ✅ 响应式生成面包屑数据
const breadcrumbs = computed(() => {
  const pathSegments = route.path.split('/').filter(Boolean)
  const items = []
  let accumulatedPath = ''

  for (let i = 0; i < pathSegments.length; i++) {
    accumulatedPath += '/' + pathSegments[i]
    const label = decodeURIComponent(pathSegments[i])

    items.push({
      label,
      link: i < pathSegments.length - 1 ? accumulatedPath : null // 最后一个不可点击
    })
  }

  return items
})
</script>
