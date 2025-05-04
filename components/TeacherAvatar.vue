

<template>
  <NuxtLink
      :to="`/teachers/${props.teacher.id}`"
      class="flex flex-col items-center space-y-2 group"
  >
    <img
        class="w-8 h-8 rounded-full object-cover group-hover:opacity-80 transition-opacity"
        :src="props.teacher.img"
        :alt="`${props.teacher.name} ${props.teacher.surname}`"
    >
    <span class="text-sm text-gray-700 group-hover:underline">
    {{ props.teacher.name }} {{ props.teacher.surname }}
  </span>
  </NuxtLink>

</template>

<script setup lang="ts">
  const props = defineProps(['teacher'])
</script>

<style scoped>

</style>