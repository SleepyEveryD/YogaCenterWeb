<template>
  <div>

    <NuxtLayout >

      <NuxtPage/>
      <MenuOverlay
          :class="[
        {'max-h-[100vh] transition-all duration-200 ease-in visible': userStore.isMenuOverlay },
        {'max-h-0 transition-all duration-200 ease-out invisible': !userStore.isMenuOverlay },
    ]"
      />

    </NuxtLayout >

  </div>
</template>



<script setup>
import { useUserStore } from '~/stores/user';
const userStore = useUserStore()

const route = useRoute()

useHead({
  title: 'YogaHeaven'
})

let windowWidth = ref(process.client ? window.innerWidth : '')

onMounted(() => {
  userStore.isLoading = true
  window.addEventListener('resize', function () {
    windowWidth.value = window.innerWidth;
  });
})

watch(() => windowWidth.value, () => {
  if (windowWidth.value >= 767) {
    userStore.isMenuOverlay = false
  }
})

watch(() => route.fullPath, () => {
  userStore.isLoading = true
})
</script>
