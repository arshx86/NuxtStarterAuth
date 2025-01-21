// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },

  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@vueuse/nuxt",
    "@nuxt/icon",
    "@nuxt/fonts",
    "nuxt-mongoose",
    "nuxt-auth-utils",
  ],

  tailwindcss: {
    exposeConfig: true,
    editorSupport: true,
  },

  colorMode: {
    classSuffix: "",
  },

  imports: {
    imports: [
      {
        from: "tailwind-variants",
        name: "tv",
      },
      {
        from: "tailwind-variants",
        name: "VariantProps",
        type: true,
      },
      {
        from: "vue-sonner",
        name: "toast",
        as: "useSonner",
      },
    ],
  },

  mongoose: {
    uri: "mongodb://localhost:27017/NuxtStarterKit",
  },
  build: {
    transpile: ["vue-sonner"],
  },
});