<template>
  <div id="AuthPage" class="w-full h-screen flex items-center justify-center bg-gray-100">
    <div class="max-w-md w-full bg-white shadow-md p-6 rounded-lg space-y-4">
      <h1 class="text-xl font-bold text-center">Login with Google</h1>
      <button
          @click="login('google')"
          class="flex items-center justify-center gap-3 px-4 py-2 bg-blue-600 text-white rounded-md w-full hover:bg-blue-700"
      >
        <img src="/google-logo.png" class="w-5 h-5" />
        <span>Continue with Google</span>
      </button>

      <div v-if="user" class="text-sm text-gray-600">
        <p>✅ Logged in as:</p>
        <pre>{{ user.email }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const client = useSupabaseClient()
const user = useSupabaseUser()
const userStore = useUserStore()

onMounted(() => {
  client.auth.onAuthStateChange(async (event, session) => {
    if (event === 'SIGNED_IN') {
      alert('✅ SIGNED_IN - user logged in')
      await userStore.handleUserLogin()
      // navigateTo('/') ← 可调试后再开启跳转
    }
  })
})

const login = async (provider) => {
  console.log('Start login')
  await client.auth.signInWithOAuth({
    provider,
    redirectTo: window.location.origin
  })
}
</script>
