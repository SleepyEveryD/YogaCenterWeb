<template>
  <div class="max-w-2xl mx-auto px-4">
    <!-- Title with hover effect -->
    <h2
        class="text-3xl md:text-4xl font-bold mb-4 text-left relative w-fit"
        :class="{'text-green-700': !isHovered, 'text-green-600': isHovered}"
        @mouseenter="isHovered = true"
        @mouseleave="isHovered = false"
    >
      {{ title }}
      <!-- Animated underline -->
      <span
          class="absolute bottom-0 left-0 h-0.5 bg-green-600 transition-all duration-300"
          :class="isHovered ? 'w-full' : 'w-0'"
      ></span>
    </h2>

    <!-- Description -->
    <p class="text-lg text-gray-600 text-left leading-relaxed">
      {{ shortDescription }}
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
  title: {
    type: String,
    required: true
  },
  shortDescription: {
    type: String,
    required: true
  }
});

const isHovered = ref(false);
</script>