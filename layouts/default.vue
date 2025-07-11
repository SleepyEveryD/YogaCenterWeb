// layoutts/default.vue
<template>
  <div class="min-h-screen flex flex-col">
    <TopBar />


    <main class="flex-1 mx-auto w-full max-w-[1200px] px-4 py-6">
      <Breadcrumbs />
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

const hasMergedCart = ref(false)

watchEffect(async () => {
  // 只在客户端 & 已登录 & 尚未 merge
  if (
      user.value &&
      process.client &&
      !localStorage.getItem('hasMergedCart') &&
      !hasMergedCart.value
  ) {
    hasMergedCart.value = true
    console.log('🛒 检测到用户已登录，开始合并购物车：', user.value.id)

    try {
      console.log('🛒 开始合并购物车...')
      await userStore.mergeCartAfterLogin(user.value.id, client)

      // ✅ merge 成功后打标记
      localStorage.setItem('hasMergedCart', 'true')


    } catch (err) {
      console.error('🛑 mergeCartAfterLogin 执行失败：', err)
    }
  }
})
</script>



<style>
/* 可选：添加全局样式确保一致的外观 */
.container {
  width: 100%;
}
</style>