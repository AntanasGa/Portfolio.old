import { defineConfig } from '@vue/cli-service'

module.exports = defineConfig({
  css: {
    loaderOptions: {
      sass: {
        aditionalData: `@import '~@/assets/sass/main.sass'`,
      },
    },
  },
})
