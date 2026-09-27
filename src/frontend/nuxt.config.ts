export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: true },
  future: { compatibilityVersion: 4 },

  css: ['@/assets/scss/index.scss'],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          additionalData: `
            @import "@/assets/scss/_variables.scss";
            @import "@/assets/scss/_breakpoints.scss";
          `,
        },
      },
    },
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:3001/api/v1',
    },
  },

  typescript: {
    strict: true,
  },
})
