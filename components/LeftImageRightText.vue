<template>
  <div class="bg-white py-12 md:py-20">
    <div class="container mx-auto px-4">
      <div class="flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-16">
        <!-- Image (Left) -->
        <div class="w-full md:w-1/2">
          <img
              :src="imageUrl"
              :alt="imageAlt"
              class="w-full h-auto rounded-xl shadow-lg object-cover"
          >
        </div>

        <!-- Content (Right) -->
        <div class="w-full md:w-1/2">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            {{ title }}
          </h2>
          <p class="text-lg text-gray-600 leading-relaxed mb-6">
            {{ description }}
          </p>

          <!-- Feature List -->
          <div v-if="features.length" class="space-y-4 mb-8">
            <div v-for="(feature, index) in features" :key="index" class="flex items-start">
              <svg class="h-6 w-6 text-green-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="text-gray-700">{{ feature }}</span>
            </div>
          </div>

          <!-- CTA Button with Link -->
          <a
              v-if="ctaText && ctaLink"
              :href="ctaLink"
              class="inline-block"
          >
            <button
                class="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-8 rounded-lg transition duration-300 shadow-md hover:shadow-lg"
            >
              {{ ctaText }}
            </button>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  imageUrl: {
    type: String,
    required: true
  },
  imageAlt: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  features: {
    type: Array,
    default: () => []
  },
  ctaText: {
    type: String,
    default: ''
  },
  ctaLink: {
    type: String,
    default: ''
  }
})
</script>