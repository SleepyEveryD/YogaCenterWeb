<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <div class="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      <div
          v-for="(card, index) in cards"
          :key="index"
          class="group relative h-80 cursor-pointer overflow-hidden rounded-2xl shadow-xl transition-all duration-500 hover:shadow-2xl"
          @mouseenter="card.isHovered = true"
          @mouseleave="card.isHovered = false"
      >
        <!-- 背景图片层 -->
        <img
            :src="card.image"
            class="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <!-- 遮罩层 -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />

        <!-- 内容容器 -->
        <div class="relative flex h-full flex-col justify-end p-6 text-white">
          <!-- 顶部标签 -->
          <div class="absolute right-4 top-4 rounded-full bg-white/10 px-3 py-1 text-sm backdrop-blur-sm">
            {{ card.tag }}
          </div>

          <!-- 主内容 -->
          <div class="space-y-2">
            <h3 class="text-2xl font-bold transition-transform duration-500 group-hover:-translate-y-2">
              {{ card.title }}
            </h3>
            <p
                class="translate-y-8 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
            >
              {{ card.description }}
            </p>
          </div>

          <!-- 展开内容 -->
          <div
              class="absolute inset-x-0 bottom-0 translate-y-full bg-white/90 p-6 text-gray-800 transition-transform duration-500 group-hover:translate-y-0"
          >
            <ul class="space-y-2 text-sm">
              <li v-for="(feature, i) in card.features" :key="i" class="flex items-center">
                <svg class="mr-2 h-4 w-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                </svg>
                {{ feature }}
              </li>
            </ul>
            <button class="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
              立即探索 →
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const cards = ref([
  {
    title: '自然探索',
    tag: '户外',
    image: 'https://source.unsplash.com/random/800x600?nature',
    description: '发现地球最原始的美',
    features: [
      '专业向导带领',
      '全套安全装备',
      '生态保护培训',
      '摄影指导服务'
    ],
    isHovered: false
  },
  {
    title: '都市夜景',
    tag: '城市',
    image: 'https://source.unsplash.com/random/800x600?city',
    description: '感受不夜城的脉搏',
    features: [
      '最佳观景位置',
      '本地美食体验',
      '历史人文讲解',
      '交通接驳服务'
    ],
    isHovered: false
  },
  {
    title: '星空露营',
    tag: '冒险',
    image: 'https://source.unsplash.com/random/800x600?stars',
    description: '银河之下的奇妙之夜',
    features: [
      '专业天文望远镜',
      '户外生存培训',
      '全天候保障团队',
      '特色星空摄影'
    ],
    isHovered: false
  }
]);
</script>