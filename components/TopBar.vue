<template>
  <header>
    <nav class="fixed top-0 left-0 w-full z-50 bg-white shadow-md border-b-[5px] border-b-[#48A6A7]">
      <div class="w-full max-w-[1184px] mx-auto px-4 pt-6 bg-white text-white">

        <!-- ✅ Desktop Topbar (middle and larger screens) -->
        <div class="hidden md:flex items-center justify-between w-full">
          <!-- Logo -->
          <div class="logo">
            <NuxtLink to="/" title="Homepage">
              <img src="../public/img/logo.png" alt="Logo" id="desktop-logo" />
            </NuxtLink>
          </div>

          <!-- Navigation links -->
          <ul class="navigation flex items-center space-x-6">
            <li
                v-for="link in links"
                :key="link.path"
                class="nav-item relative"
                @mouseenter="activeDropdown = link.title"
                @mouseleave="activeDropdown = null"
            >
              <NuxtLink
                  class="landmark flex items-center justify-center text-gray-800 hover:text-cyan-700"
                  :to="link.path"
                  :aria-label="`Link to ${link.title}`"
              >
                {{ link.title }}
                <Icon
                    v-if="link.dropdown"
                    name="heroicons:chevron-down"
                    class="ml-1 w-4 h-4"
                />
              </NuxtLink>

              <!-- Dropdown -->
              <ul
                  v-if="link.dropdown && activeDropdown === link.title"
                  class="dropdown-menu absolute top-full left-0 bg-white border border-gray-200 shadow-lg z-10 min-w-[150px] py-2"
              >
                <li v-for="sublink in link.dropdown" :key="sublink.path">
                  <NuxtLink
                      class="block px-4 py-2 text-gray-800 hover:bg-gray-100 hover:text-cyan-700"
                      :to="sublink.path"
                  >
                    {{ sublink.title }}
                  </NuxtLink>
                </li>
              </ul>
            </li>
          </ul>

          <!-- Cart + User -->
          <div class="flex items-center space-x-6">
            <NuxtLink
                to="/shoppingCart"
                class="relative text-gray-800 hover:text-cyan-700"
                aria-label="Shopping cart"
            >
              <Icon name="heroicons:shopping-cart" class="w-6 h-6" />
              <span
                  v-if="cartCount > 0"
                  class="absolute -top-2 -right-2 bg-purple-400 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold"
              >
                {{ cartCount }}
              </span>
            </NuxtLink>

            <!-- User dropdown -->
            <div
                class="relative"
                @mouseenter="isUserDropdownOpen = true"
                @mouseleave="isUserDropdownOpen = false"
            >
              <button
                  @click="toggleUserDropdown"
                  class="flex items-center text-gray-800 hover:text-cyan-700"
              >
                <Icon name="heroicons:user-circle" class="w-6 h-6" />
                <Icon
                    name="heroicons:chevron-down"
                    class="ml-1 w-4 h-4 transition-transform"
                    :class="{ 'rotate-180': isUserDropdownOpen }"
                />
              </button>

              <transition
                  enter-active-class="transition duration-100 ease-out"
                  enter-from-class="transform scale-95 opacity-0"
                  enter-to-class="transform scale-100 opacity-100"
                  leave-active-class="transition duration-75 ease-in"
                  leave-from-class="transform scale-100 opacity-100"
                  leave-to-class="transform scale-95 opacity-0"
              >
                <div
                    v-if="isUserDropdownOpen"
                    class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50"
                >
                  <div v-if="!currentUser" class="py-1">
                    <NuxtLink
                        to="/auth"
                        class="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        @click="isUserDropdownOpen = false"
                    >Register</NuxtLink>
                    <NuxtLink
                        to="/auth"
                        class="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        @click="isUserDropdownOpen = false"
                    >Log in</NuxtLink>
                  </div>
                  <div v-else class="py-1">
                    <div class="px-4 py-2 text-sm text-gray-700 border-b">
                      Hi, {{ currentUser.email }}
                    </div>
                    <button
                        @click="signOut"
                        class="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >Sign out</button>
                  </div>
                </div>
              </transition>
            </div>
          </div>
        </div>



        <!-- ✅ Mobile Topbar (smaller screens) -->
        <div class="flex md:hidden items-center justify-between w-full px-2 py-2">
          <!-- ✅ Hamburger 包裹 hover 和 click -->
          <div
              class="relative"
              @mouseenter="mobileNav = true"
              @mouseleave="mobileNav = false"
          >
            <!-- Hamburger icon -->
            <div @click="toggleMobileNav" class="cursor-pointer">
              <Icon name="heroicons:bars-3" class="w-7 h-7 text-gray-800" />
            </div>

            <!-- ✅ Mobile Dropdown（无动画） -->
            <ul
                v-if="mobileNav"
                class="absolute top-full left-0 w-40 bg-white z-40 shadow-md border border-gray-200 py-4"
            >
              <!-- Logo -->
              <li class="flex justify-center mb-4">
                <NuxtLink to="/" @click="toggleMobileNav">
                  <img src="public/img/logo.png" alt="Logo" class="h-8" />
                </NuxtLink>
              </li>

              <!-- 菜单链接 -->
              <li
                  v-for="link in links"
                  :key="link.path"
                  class="relative text-center py-2 border-t border-gray-100"
                  @mouseenter="activeDropdown = link.title"
                  @mouseleave="activeDropdown = null"
              >
                <NuxtLink
                    class="landmark flex items-center justify-center text-gray-800 hover:text-cyan-700"
                    :to="link.path"
                    :aria-label="`Link to ${link.title}`"
                >
                  {{ link.title }}
                  <Icon
                      v-if="link.dropdown"
                      name="heroicons:chevron-right"
                      class="ml-1 w-4 h-4"
                  />
                </NuxtLink>

                <!-- 子菜单显示在右边 -->
                <ul
                    v-if="link.dropdown && activeDropdown === link.title"
                    class="absolute top-0 left-full bg-white border border-gray-200 shadow-lg z-50 min-w-[150px] py-2"
                >
                  <li v-for="sublink in link.dropdown" :key="sublink.path">
                    <NuxtLink
                        class="block px-4 py-2 text-gray-800 hover:bg-gray-100 hover:text-cyan-700"
                        :to="sublink.path"
                    >
                      {{ sublink.title }}
                    </NuxtLink>
                  </li>
                </ul>
              </li>

              <!-- 关闭按钮 -->
              <li class="text-center mt-4">
                <button
                    @click="toggleMobileNav"
                    class="text-gray-500 text-sm hover:text-red-500"
                >
                  &#10006; Close
                </button>
              </li>
            </ul>

          </div>

          <!-- ✅ Right side: cart & user -->
          <div class="flex items-center space-x-4">
            <NuxtLink to="/shoppingCart" aria-label="Shopping cart">
              <Icon name="heroicons:shopping-cart" class="w-6 h-6 text-gray-800" />
            </NuxtLink>

            <!-- User dropdown 保留不动 -->
            <div
                class="relative"
                @mouseenter="isUserDropdownOpen = true"
                @mouseleave="isUserDropdownOpen = false"
            >
              <button
                  @click="toggleUserDropdown"
                  class="flex items-center text-gray-800 hover:text-cyan-700"
              >
                <Icon name="heroicons:user-circle" class="w-6 h-6" />
                <Icon
                    name="heroicons:chevron-down"
                    class="ml-1 w-4 h-4 transition-transform"
                    :class="{ 'rotate-180': isUserDropdownOpen }"
                />
              </button>

              <!-- 下拉菜单（带动画，可选保留或去除） -->
              <div
                  v-if="isUserDropdownOpen"
                  class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50"
              >
                <div v-if="!currentUser" class="py-1">
                  <NuxtLink
                      to="/auth"
                      class="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      @click="isUserDropdownOpen = false"
                  >Register</NuxtLink>
                  <NuxtLink
                      to="/auth"
                      class="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      @click="isUserDropdownOpen = false"
                  >Log in</NuxtLink>
                </div>
                <div v-else class="py-1">
                  <div class="px-4 py-2 text-sm text-gray-700 border-b">
                    Hi, {{ currentUser.email }}
                  </div>
                  <button
                      @click="signOut"
                      class="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>




      </div>



      <!-- ✅ Overlay -->

    </nav>
  </header>
</template>


<script setup>
import { useUserStore } from "~/stores/user";
import { useSupabaseClient, useSupabaseUser } from '#imports'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { overrideCartBeforeSignOut } from '@/utils/overrideCartBeforeSignOut'


const userStore = useUserStore()
const client = useSupabaseClient()
const user = useSupabaseUser()

// 响应式状态
const mobile = ref(null)
const mobileNav = ref(null)
const windowWidth = ref(null)
const activeDropdown = ref(null)
const isHomePage = ref(true)
const currentUser = ref(user.value)
const isUserDropdownOpen = ref(false)

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

// 计算属性
const cartCount = computed(() => userStore.cart?.length || 0)

// 方法
const toggleMobileNav = () => {
  mobileNav.value = !mobileNav.value
  if (mobileNav.value) {
    document.documentElement.style.overflow = "hidden"
  } else {
    document.documentElement.style.overflow = ""
  }
}

const checkScreen = () => {
  windowWidth.value = window.innerWidth
  mobile.value = windowWidth.value < 850
  if (!mobile.value) {
    mobileNav.value = false
    document.documentElement.style.overflow = ""
  }
}

const handleClickOutside = (event) => {
  const dropdownNav = document.querySelector('.dropdown-nav')
  const trigger = document.querySelector('.hamburger-menu')

  if (dropdownNav && trigger &&
      !dropdownNav.contains(event.target) &&
      !trigger.contains(event.target)) {
    mobileNav.value = false
  }
}

const toggleUserDropdown = () => {
  isUserDropdownOpen.value = !isUserDropdownOpen.value
}

const handleUserDropdownClickOutside = (event) => {
  const dropdown = document.querySelector('.user-dropdown-content')
  const trigger = document.querySelector('.user-dropdown-trigger')

  if (dropdown && trigger &&
      !dropdown.contains(event.target) &&
      !trigger.contains(event.target)) {
    isUserDropdownOpen.value = false
  }
}

const signOut = async () => {
  try {
    const userId = user.value?.id
    console.log('userId:', userId)
    await overrideCartBeforeSignOut(userId, userStore.cart, client)


    localStorage.removeItem('hasMergedCart')
    userStore.clearCart()
    await client.auth.signOut()

    await navigateTo('/')
  } catch (error) {
    console.error('登出失败:', error)
  }

}

// 生命周期
onMounted(() => {
  // 监听认证状态变化
  client.auth.onAuthStateChange((event, session) => {
    currentUser.value = session?.user || null
  })

  if (process.client) {
    window.addEventListener("resize", checkScreen)
    document.addEventListener("click", handleClickOutside)
    document.addEventListener("click", handleUserDropdownClickOutside)
    checkScreen()
  }
})

onBeforeUnmount(() => {
  if (process.client) {
    window.removeEventListener("resize", checkScreen)
    document.removeEventListener("click", handleClickOutside)
    document.removeEventListener("click", handleUserDropdownClickOutside)
  }
})
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600&display=swap");

ul{
  padding: 0;
}

li{
  list-style-type: none;
}

header {
  max-width: 100%;
}


.logo{
  display: flex;
  align-items: center;
  height: 6vh;
  width: 6vh;
}

#desktop-logo {
  max-width: 100%;
  max-height: 100%;
}
#mobile-logo {
  margin-top: 20px;
  max-width: 15vh;
  max-height: 15vh;
}

.navigation {
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: space-around;
  gap: 0.3vw;
}

.navigation a {
  color: #000000;
  text-decoration: none;
  font-size: 100%;
  font-family: "Jost";
  transition: color 0.3s ease;
}

.navigation a:hover {
  color: #006A71;
  cursor: pointer;
  text-decoration: underline;
}

.landmark {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.landmark-container {
  width: 10vw;
  height: 5vh;
  border-radius: 10px;
  display: block;
  transition: background-color 0.3s ease, border 0.3s ease;
}

.landmark-container:hover {
  background-color: #ffffff;
}

.icon {
  display: flex;
  align-items: center;
}

.hamburger-menu {
  cursor: pointer;
  transition: 0.5s ease all;
  padding: 7px 10px;
  border-radius: 10px;
}

.hamburger-menu:hover {
  background-color: #A78BCA;
}

.hamburger-menu:active {
  background-color: #A78BCA;
}

.dropdown-nav {
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  width: 60%;
  height: 100vh;
  min-width: 270px;
  top: 0;
  left: 0;
  margin-top: 0;
  z-index: 500;
  border-right: 5px solid #A78BCA;
}

.mobile-nav-enter-active, .mobile-nav-leave-active {
  transition: 1s ease all;
}

.mobile-nav-enter-from, .mobile-nav-leave-to {
  transform: translateX(-100%);
}

.mobile-nav-enter-to {
  transform: translateX(0);
}

.separator-mobile {
  margin: 3vh 0;
}

.close-cross {
  font-size: 4vh;
  text-align: center;
  color: #000000;
  transition: 0.3s;
  cursor: pointer;
  padding-top: 3vh;
}

.close-cross:hover {
  color: rgb(200, 0, 0);
  text-decoration: underline;
  text-underline-offset: 6px;
  transform: translateY(-5px);
}

.close-cross:active {
  transform: scale(0.95);
}

.dropdown-overlay {
  filter: invert(0);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
}

.dropdown-overlay-enter-active, .dropdown-overlay-leave-active {
  transition: opacity 0.5s;
}

.dropdown-overlay-enter-from, .dropdown-overlay-leave-to {
  opacity: 0;
}

.dropdown-overlay-enter-to, .dropdown-overlay-leave-from {
  opacity: 1;
}

.landmark-mobile {
  color: #643173;
  font-family: "Jost";
  font-size: 2.5vh;
  text-decoration: none;
  font-weight: 600;
  padding: 10% 0;
  display: inline-block;
  transition: 0.3s;
}

.landmark-mobile:hover {
  color: #A78BCA;
  transform: translateY(-5px);
}
.nav-item {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  border: 1px solid #ccc;
  z-index: 10;
  min-width: 150px;
  padding: 10px 0;
  box-shadow: 0px 4px 6px rgba(0,0,0,0.1);
}

.dropdown-menu li {
  padding: 8px 16px;
}

.dropdown-menu li a {
  color: #000;
  text-decoration: none;
  display: block;
  font-family: "Jost";
}

.dropdown-menu li a:hover {
  color: #006A71;
  text-decoration: underline;
}


</style>