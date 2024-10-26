// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  routeRules: {
    // prerender index route by default
    '/': { prerender: true },
  },
  plugins: [
    '~/plugins/axios.js'
],
  modules: ['@pinia/nuxt'],
  compatibilityDate: '2024-10-26',
});