// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  pages: true,

  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxt/ui',
    '@pinia/nuxt',  // 确保这个模块在列表中
    'nuxt-lodash',
    '@nuxtjs/supabase',
    '@nuxtjs/tailwindcss',
    // 移除 '@pinia-plugin-persistedstate/nuxt' (已废弃)
  ],

  // 更新 pinia 配置方式
  imports: {
    dirs: ['stores'],
  },
  supabase: {
    redirect: false
  },

  // 添加 pinia 类型支持
  typescript: {
    typeCheck: true,
    strict: true,
    tsConfig: {
      compilerOptions: {
        types: [
            "node",
            '@pinia/nuxt',
            '@nuxt/content',
            '@nuxt/ui'
        ]
      }
    }
  },

  runtimeConfig: {
    public: {
      stripePk: process.env.STRIPE_PK_KEY,
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY
    }
  },
  vite: {
    plugins: [
      // 移除或更新 vite-plugin-checker 的配置
    ]
  },

  app: {
    head: {
      script: [
        { src: 'https://js.stripe.com/v3/', defer: true }
      ]
    }
  }
})