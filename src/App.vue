<template>
  <BackgroundFiller />
  <RouterView />
  <NavigationBar />
</template>

<script lang="ts">
import { RouterView } from 'vue-router'
import BackgroundFiller from '@/components/BackgroundFiller.vue'
import NavigationBar from './components/NavigationBar.vue'
import { defineComponent } from 'vue'
import { useLightingStore } from './stores/lighting'

export default defineComponent({
  setup() {
    const lighting = useLightingStore()
    return { lighting }
  },
  created() {
    this.themeSelector()
  },
  methods: {
    themeSelector() {
      const cookies: { [key: string]: string | undefined } = Object.fromEntries(
        document.cookie.split('; ').map((el) => el.split('=', 2)),
      )
      const scheme = window.matchMedia('(prefers-color-scheme: dark)')
      scheme.addEventListener('change', (e) => {
        const querry = e.matches ? 'dark' : 'light'
        this.lighting.preferred = querry
        document.cookie = `preferred=${querry}; path=/; SameSite=Strict; Secure`
        if (this.lighting.mode !== 'auto') {
          return
        }
        if (e.matches) {
          document.documentElement.setAttribute('class', 'dark')
        } else {
          document.documentElement.removeAttribute('class')
        }
      })

      const querry = scheme.matches ? 'dark' : 'light'
      this.lighting.preferred = querry
      document.cookie = `preferred=${querry}; path=/; SameSite=Strict; Secure`
      if (
        !('theme' in cookies) ||
        !['dark', 'light', 'auto'].includes(cookies['theme'] || '')
      ) {
        document.cookie = `theme=auto; path=/; SameSite=Strict; Secure`
      } else {
        this.lighting.mode = cookies['theme'] as 'dark' | 'light' | 'auto'
        switch (this.lighting.mode) {
          case 'dark':
            document.documentElement.setAttribute('class', 'dark')
            break
          case 'light':
            document.documentElement.removeAttribute('class')
        }
      }
      if (this.lighting.mode !== 'auto') {
        return
      }
      if (scheme.matches) {
        this.lighting.mode = 'dark'
        document.documentElement.setAttribute('class', 'dark')
      } else {
        this.lighting.mode = 'light'
        document.documentElement.removeAttribute('class')
      }
    },
  },
  components: { RouterView, BackgroundFiller, NavigationBar },
})
</script>

<style lang="sass">
@import '@/assets/base.sass'
@import '@/assets/sass/main.sass'

#app
  margin: 0 auto

  font-weight: normal
</style>
