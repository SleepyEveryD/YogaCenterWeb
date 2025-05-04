<template>
  <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden relative">
    <!-- 星星图标 -->
    <div
        v-if="activity.star"
        class="absolute -top-1 -right-1 bg-yellow-400 rounded-full p-1 z-10"
    >
      <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4 text-white"
          viewBox="0 0 20 20"
          fill="currentColor"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    </div>
    <!-- 图片区域 -->
    <NuxtLink
        :to="`/courses/${activity.id}`"
        class="relative h-48 w-full bg-gray-200 overflow-hidden block"
    >
      <img
          class="absolute h-full w-full object-cover transition-transform duration-500 ease-in-out transform hover:scale-110"
          :src="activity.img"
          :alt="activity.title || 'Course image'"
      >
      <!-- 顶部标签（移到图片上方） -->
      <div class="absolute top-4 left-4 z-10">
      <span class="inline-block px-3 py-1 text-xs font-semibold text-purple-600 bg-purple-100 rounded-full">
        {{ activity.Type }}
      </span>
      </div>
    </NuxtLink>

    <!-- 主要内容 -->
    <div class="p-6">
      <h3 class="text-xl font-semibold text-gray-900 mb-2">{{activity.name}}</h3>
      <p class="text-gray-600 mb-6">
        {{activity.description}}
      </p>

      <!-- 作者列表 -->
      <div class="border-t border-gray-100 pt-4">
        <div class="flex flex-wrap gap-3">
          <!-- 作者-->
          <div v-for="(teach, index) in activity.Teach" :key="index">
            <TeacherAvatar :teacher="teach.Teacher" />
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps(['activity'])


</script>

