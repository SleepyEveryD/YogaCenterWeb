<!-- /error.vue -->
<script setup>
import { onMounted } from 'vue'
import { useError, clearError, navigateTo } from '#app'

const error = useError()

onMounted(() => {
  // 清除 Nuxt 错误状态，否则导航后仍停留在错误状态
  clearError({ redirect: '/' })
})
</script>

<template>
  <div class="text-center py-20">
    <p class="text-xl">Redirecting to home...</p>
  </div>
</template>
