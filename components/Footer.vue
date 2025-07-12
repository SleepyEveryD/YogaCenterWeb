<template>
  <footer class="bg-[#006a71] border-t-4 border-[#48a6a7] text-white font-['Jost'] text-sm mt-8">
    <div class="flex flex-col lg:flex-row justify-between flex-wrap gap-8 py-8 px-32">

      <!-- ✅ Menu Links（两列） -->

        <!-- 左列：其他菜单 -->
        <div class="space-y-2">
          <div
              v-for="link in otherLinks"
              :key="link.title"
          >
            <NuxtLink :to="link.path" class="font-semibold hover:text-gray-200">
              {{ link.title }}
            </NuxtLink>
          </div>
        </div>

        <!-- 右列：Activities + 子菜单 -->
        <div>
          <NuxtLink
              :to="activitiesLink.path"
              class="font-semibold text-base hover:text-gray-200"
          >
            {{ activitiesLink.title }}
          </NuxtLink>
          <ul class="mt-2 space-y-1 text-sm ml-1">
            <li v-for="sublink in activitiesLink.dropdown" :key="sublink.title">
              <NuxtLink :to="sublink.path" class="hover:text-gray-200">
                {{ sublink.title }}
              </NuxtLink>
            </li>
          </ul>
        </div>


      <!-- 📌 联系方式 -->
      <div class="space-y-4 text-sm">
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
      </div>

      <!-- 📌 社交 -->
      <div class="flex gap-8">
        <a href="https://www.instagram.com" target="_blank" aria-label="Instagram">
          <img src="/img/contacts/instagram_logo_hover.png" alt="Instagram" class="w-8 hover:scale-110 transition" />
        </a>
        <a href="https://www.facebook.com" target="_blank" aria-label="Facebook">
          <img src="/img/contacts/facebook_logo_hover.png" alt="Facebook" class="w-8 hover:scale-110 transition" />
        </a>
        <a href="https://twitter.com/home" target="_blank" aria-label="Twitter">
          <img src="/img/contacts/twitter_logo_hover.png" alt="Twitter" class="w-8 hover:scale-110 transition" />
        </a>
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
      { title: "Type1", path: "/activities/Type1" },
      { title: "Type2", path: "/activities/Type2" },
      { title: "Type3", path: "/activities/Type3" },
    ]
  },
  { title: "Teachers", path: "/teachers" },
  { title: "About us", path: "/about_us" },
  { title: "Contact us", path: "/contact_us" },
])

// 分离出 Activities 和 其他链接
const activitiesLink = computed(() => links.value.find(link => link.title === 'Activities'))
const otherLinks = computed(() => links.value.filter(link => link.title !== 'Activities'))
</script>
