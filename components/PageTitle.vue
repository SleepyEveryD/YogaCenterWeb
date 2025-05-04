<template>
  <div class="flex flex-col items-center text-center max-w-2xl mx-auto px-4">
    <h2 class="text-3xl md:text-4xl font-bold mb-4">{{ title }}</h2>
    <p class="text-lg text-gray-600">{{ shortDescription }}</p>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  shortDescription: {
    type: String,
    required: true
  }
})
</script>