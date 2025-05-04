<template>
  <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-[450px]">
    <!-- Teacher Photo (Fixed height) -->
    <NuxtLink
        :to="`/teachers/${teacher.id}`"
        class="w-full block overflow-hidden group h-48"
    >
      <img
          class="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
          :src="teacher.img || '/default-teacher.jpg'"
          :alt="`${teacher.name} ${teacher.surname}`"
      >
    </NuxtLink>

    <!-- Teacher Info (Flexible content area with scroll if needed) -->
    <div class="p-6 flex-1 flex flex-col overflow-hidden">
      <!-- Name -->
      <h1 class="text-2xl font-bold text-gray-800">{{ teacher.name }} {{ teacher.surname }}</h1>

      <!-- Short Description with fixed height and scroll -->
      <p class="mt-3 text-gray-600 italic h-20 overflow-y-auto">
        {{ teacher.description || 'No description available' }}
      </p>

      <!-- Classes (Fixed height with scroll) -->
      <div class="mt-4 flex-1 overflow-y-auto max-h-32">
        <div class="flex flex-wrap gap-2">
          <span
              v-for="teach in teacher.Teach"
              :key="teach.Course.id"
              class="px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm  mt-2"
          >
            <NuxtLink
                :to="`/activities/${teach.Course.id}`"
                class="hover:underline"
            >
              {{ teach.Course.name }}
            </NuxtLink>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  teacher: {
    type: Object,
    required: true,
    default: () => ({
      id: '',
      name: '',
      surname: '',
      description: '',
      img: '',
      Teach: []
    })
  }
});
</script>