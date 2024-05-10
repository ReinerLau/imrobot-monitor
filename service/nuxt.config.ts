// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ["@nuxtjs/tailwindcss", "nuxt-primevue", "nuxt-security"],
  css: [
    "primevue/resources/themes/aura-light-teal/theme.css",
    "rrweb-player/dist/style.css",
  ],
  security: {
    corsHandler: {
      origin: "*",
    },
    xssValidator: false,
  },
});
