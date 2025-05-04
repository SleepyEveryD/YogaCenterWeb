// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/google-fonts',
    '@nuxtjs/tailwindcss',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxtjs/supabase',

  ],
  googleFonts: {
    families: {
      Montserrat: true,
    }
  },
  supabase: {
    redirect: false
  },

})
