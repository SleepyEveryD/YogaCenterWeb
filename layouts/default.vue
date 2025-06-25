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

<script setup lang="ts">
import Footer from "~/components/Footer.vue";
</script>

<style>
/* 可选：添加全局样式确保一致的外观 */
.container {
  width: 100%;
}
</style>