// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["~/assets/css/main.css"],
  app: {
    head: {
      title: "Expense Tracker",
      link: [
        { rel: "icon", type: "image/x-icon", href: "/icon.png" },
        { rel: "manifest", href: "/manifest.json" },
      ],
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "theme-color", content: "#212121" },
      ],
    },
  },
  ssr: false,
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    // Will be available in both server and client
    public: {
      // https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-runtime-config
      firebase: {
        apiKey: process.env.NUXT_PUBLIC_API_KEY,
        authDomain: process.env.NUXT_PUBLIC_AUTH_DOMAIN,
        projectId: process.env.NUXT_PUBLIC_PROJECT_ID,
        storageBucket: process.env.NUXT_PUBLIC_STORAGE_BUCKET,
        messagingSenderId: process.env.NUXT_PUBLIC_MESSAGING_SENDER_ID,
        appId: process.env.NUXT_PUBLIC_APP_ID,
        measurementId: process.env.NUXT_PUBLIC_MEASUREMENT_ID,
      },
    },
  },
});
