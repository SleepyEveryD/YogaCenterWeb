<template>
  <footer class="bg-[#006a71] border-t-4 border-[#48a6a7] text-white font-['Jost'] text-sm mt-8">
    <div
        class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6 sm:px-12 lg:px-32 py-8 text-center lg:text-left"
    >

      <!-- 🟩 小/中屏 & 大屏列1：其他链接 -->
      <div class="flex flex-col items-center lg:items-start gap-2">
        <div v-for="link in otherLinks" :key="link.title">
          <NuxtLink :to="link.path" class="font-semibold hover:text-gray-200">
            {{ link.title }}
          </NuxtLink>
        </div>

        <!-- 在小/中屏幕下，把 Activities 放在这列 -->
        <div class="lg:hidden mt-4">
          <NuxtLink :to="activitiesLink.path" class="font-semibold text-base hover:text-gray-200">
            {{ activitiesLink.title }}
          </NuxtLink>
          <ul class="mt-2 space-y-1 text-sm">
            <li v-for="sublink in activitiesLink.dropdown" :key="sublink.title">
              <NuxtLink :to="sublink.path" class="hover:text-gray-200">
                {{ sublink.title }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <!-- 🟦 大屏列2：Activities（主链接） -->
      <div class="hidden lg:flex flex-col items-start">
        <NuxtLink :to="activitiesLink.path" class="font-semibold text-base hover:text-gray-200">
          {{ activitiesLink.title }}
        </NuxtLink>
      </div>

      <!-- 🟧 大屏列3：Activities 子菜单 -->
      <div class="hidden lg:flex flex-col items-start text-sm space-y-1">
        <ul>
          <li v-for="sublink in activitiesLink.dropdown" :key="sublink.title">
            <NuxtLink :to="sublink.path" class="hover:text-gray-200">
              {{ sublink.title }}
            </NuxtLink>
          </li>
        </ul>
      </div>

      <!-- 🟥 联系方式 + 社交图标 -->
      <div class="flex flex-col items-center lg:items-start gap-3 text-sm">
        <div>
          <p class="font-semibold">Number</p>
          <p>123-456-7890</p>
        </div>
        <div>
          <p class="font-semibold">Email</p>
          <p>contact.mail@mail.com</p>
        </div>
        <div>
          <p class="font-semibold">Headquarters</p>
          <p>Piazza Leonardo da Vinci, 32</p>
        </div>

        <!-- 社交图标 -->
        <div class="flex gap-6 mt-4">
          <a href="https://www.instagram.com" target="_blank" aria-label="Instagram">
            <img src="/img/contacts/instagram_logo_hover.png" alt="Instagram" class="w-6 hover:scale-110 transition" />
          </a>
          <a href="https://www.facebook.com" target="_blank" aria-label="Facebook">
            <img src="/img/contacts/facebook_logo_hover.png" alt="Facebook" class="w-6 hover:scale-110 transition" />
          </a>
          <a href="https://twitter.com/home" target="_blank" aria-label="Twitter">
            <img src="/img/contacts/twitter_logo_hover.png" alt="Twitter" class="w-6 hover:scale-110 transition" />
          </a>
        </div>
      </div>

    </div>
  </footer>
</template>

<script setup>
import { ref, computed } from 'vue'

const links = ref([
  { title: "Home", path: "/" },
  {
    title: "Activities",
    path: "/activities",
    dropdown: [
      { title: "Highlights✨", path: "/activities/Highlights" },
      { title: "Expertise", path: "/activities/type/Expertise" },
      { title: "Retreats", path: "/activities/type/Retreats" },
      { title: "Meditation", path: "/activities/type/Meditation" },
      { title: "Workshop", path: "/activities/type/Workshop" },
      { title: "Seminars", path: "/activities/type/Seminars" },

    ]
  },
  { title: "Teachers", path: "/teachers" },
  { title: "About us", path: "/about_us" },
  { title: "Contact us", path: "/contact_us" },
])

const activitiesLink = computed(() => links.value.find(link => link.title === 'Activities'))
const otherLinks = computed(() => links.value.filter(link => link.title !== 'Activities'))
</script>
