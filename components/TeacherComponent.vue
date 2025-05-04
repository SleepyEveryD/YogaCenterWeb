<template>
  <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
    <!-- Teacher Photo (Full width, top) -->
    <NuxtLink
        :to="`/teachers/${props.teacher.id}`"
        class="w-full block overflow-hidden group"
    >
      <img
          class="h-64 w-full object-cover transition-all duration-300 group-hover:scale-105"
          :src="props.teacher.img"
          :alt="`${props.teacher.name} ${props.teacher.surname}`"
      >
      <!-- 半透明遮罩层（可选） -->
    </NuxtLink>

    <!-- Teacher Info (Below photo) -->
    <div class="p-6">
      <!-- Name -->
      <h1 class="text-2xl font-bold text-gray-800">{{teacher.name}} {{teacher.surname}}</h1>

      <!-- Short Description -->
      <p class="mt-3 text-gray-600 italic">
        {{teacher.description}}
      </p>

      <!-- Classes -->
      <div class="mt-4">
        <div class="flex flex-wrap gap-2">
          <span
              v-for="teach in teacher.Teach"
              :key="teach.Course.id"
              class="px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm"
          >
            <a
                :href="`/activities/${teach.Course.id}`"
                class="hover:underline"
            >{{ teach.Course.name }}</a>


</span>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['teacher'])
</script>

