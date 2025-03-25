// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  routeRules: {
    '/': { redirect: '/login' }
  },
  css: [
    '@/assets/styles.scss',
  ],
  modules: ['@pinia/nuxt'],
  
  imports: {
    dirs: ['stores'],
  },
  
  typescript: {
    strict: true,
  },
  
})
