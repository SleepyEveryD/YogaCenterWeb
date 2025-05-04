<template>
  <div class="relative min-h-[70vh] flex items-center justify-center bg-gray-900 overflow-hidden">
    <!-- Dynamic Background Image -->
    <img
        :src="img"
        alt="Inspirational background"
        class="absolute inset-0 w-full h-full object-cover opacity-70"
    >

    <!-- Dynamic Quote Overlay -->
    <div class="relative max-w-2xl mx-auto px-6 text-center z-10">
      <blockquote
          v-if="Array.isArray(text)"
          class="text-2xl md:text-3xl lg:text-4xl font-serif leading-tight tracking-wide text-white"
      >
        <p
            v-for="(line, index) in text"
            :key="index"
            class="mb-4 last:mb-0 transform transition duration-500 hover:scale-105"
        >
          {{ line }}
        </p>
      </blockquote>

      <blockquote
          v-else
          class="text-2xl md:text-3xl lg:text-4xl font-serif leading-tight tracking-wide text-white"
      >
        <p class="transform transition duration-500 hover:scale-105">
          {{ text }}
        </p>
      </blockquote>

      <!-- Decorative Divider -->
      <div class="mt-8 border-t border-white/30 w-24 mx-auto"></div>


    </div>
  </div>
</template>

<script setup>
defineProps({
  img: {
    type: String,
    required: true
  },
  text: {
    type: [String, Array],
    required: true,
    validator: (value) => {
      if (Array.isArray(value)) {
        return value.every(item => typeof item === 'string')
      }
      return typeof value === 'string'
    }
  }

})
</script>