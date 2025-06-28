// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'
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
    '@nuxt/test-utils/module',
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
          '@nuxt/schema',
          '@pinia/nuxt',
          '@nuxt/content',
          '@nuxt/ui'
        ]
      }
    }
  },

  runtimeConfig: {

    supabase: {
      url: process.env.SUPABASE_URL,
      key: process.env.SUPABASE_KEY,
      serviceKey: process.env.SUPABASE_SERVICE_KEY,
      redirect: false
    },
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
      stripePk: process.env.STRIPE_PK_KEY
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