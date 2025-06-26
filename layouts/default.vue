<template>
  <div class="min-h-screen flex flex-col">
    <TopBar />

    <main class="flex-1 mx-auto w-full max-w-[1200px] px-4 py-6">
      <div class="container">
        <!-- 你的主要内容 -->
      </div>
      <slot></slot>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import Footer from "~/components/Footer.vue";
import { useUserStore } from '@/stores/user'

const client = useSupabaseClient()
const user = useSupabaseUser()
const userStore = useUserStore()

let hasMergedCart = false

watchEffect(async () => {
  if (user.value && !hasMergedCart) {
    hasMergedCart = true
    console.log('检测到用户已登录，开始合并购物车：', user.value.id)
    await userStore.mergeCartAfterLogin(user.value.id, client)
  }
})
</script>

<style>
/* 可选：添加全局样式确保一致的外观 */
.container {
  width: 100%;
}
</style>