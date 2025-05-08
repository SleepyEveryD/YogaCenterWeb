<template>
  <!-- 外层容器：响应式分栏布局 -->
  <div class="flex flex-col md:flex-row gap-4 md:gap-8 p-4 md:p-8 max-w-7xl mx-auto">

    <!-- 左边栏：图片 + 教师头像 -->
    <div class="md:w-2/5 w-full space-y-4 md:space-y-6">

      <!-- 课程图片 -->
      <img
          :src="activity.img"
          alt="Activity image"
          class="w-full h-[250px] md:h-[400px] object-cover rounded-xl shadow-lg mb-4 md:mb-6"
      />

      <!-- 教师头像滚动区 -->
      <div class="overflow-x-auto pb-2 px-2">
        <div class="flex flex-nowrap gap-3 md:gap-4">
          <NuxtLink
              v-for="teach in activity.Teach"
              :key="teach.Teacher.id"
              :to="`/teachers/${teach.Teacher.id}`"
              class="flex-shrink-0 transition-transform hover:-translate-y-1"
          >
            <TeacherAvatar
                :teacher="teach.Teacher"
            />
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- 右边栏：课程信息 -->
    <div class="md:w-3/5 w-full space-y-4 md:space-y-6">

      <!-- 标题 -->
      <h1 class="text-2xl md:text-3xl font-bold text-gray-800">
        {{ activity.name }}
      </h1>

      <!-- 描述 -->
      <div class="text-gray-600 leading-relaxed space-y-3">
        <p class="text-base md:text-lg">
          {{ activity.description }}
        </p>
      </div>

      <!-- CV链接 -->
      <div class="mt-4 md:mt-6">
        <NuxtLink
            :to="activity.CV"
            target="_blank"
            class="inline-block px-5 py-2.5 md:px-6 md:py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all text-sm md:text-base"
        >
          View {{ activity.name }}'s CV
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const activity = await $fetch("/api/activities/" + route.params.id);

</script>

<script>
export default {
  computed: {
    BCrumbs() {
      return [
        {
          label: "home",
          url: "/",
        },

        {
          label: "our team",
          url: "/our_team",
        },
      ];
    },
  },
};
</script>


