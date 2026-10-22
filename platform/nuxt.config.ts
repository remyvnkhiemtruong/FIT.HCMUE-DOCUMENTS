export default defineNuxtConfig({
  modules: ['@nuxt/eslint'],
  devtools: { enabled: false },
  app: {
    head: {
      htmlAttrs: { lang: 'vi' },
      script: [
        {
          innerHTML:
            'try{const m=localStorage.getItem(\'fit-theme\');document.documentElement.dataset.theme=(m===\'dark\'||(!m&&matchMedia(\'(prefers-color-scheme: dark)\').matches))?\'dark\':\'light\'}catch{}',
        },
      ],
      title: 'Kho học liệu · FIT HCMUE',
      meta: [
        {
          name: 'description',
          content:
            'Không gian học tập của Khoa Công nghệ Thông tin, Trường Đại học Sư phạm TP. Hồ Chí Minh.',
        },
        { name: 'robots', content: 'noindex, nofollow' },
      ],
    },
  },
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    databaseUrl: '',
    public: {
      legacyUrl: 'https://remyvnkhiemtruong.github.io/FIT.HCMUE-DOCUMENTS/',
    },
  },
  compatibilityDate: '2026-10-21',
  nitro: {
    preset: 'node-server',
  },
  typescript: {
    strict: true,
    tsConfig: {
      compilerOptions: {
        noUncheckedIndexedAccess: true,
      },
    },
  },
  eslint: {
    config: {
      stylistic: true,
    },
  },
})
