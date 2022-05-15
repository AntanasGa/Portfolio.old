<template>
  <main>
    <div class="home">
      <div class="frame">
        <div class="bubble">
          <h1 class="message greeting">
            {{ $t('home.greeting') }}
            <a href="https://www.linkedin.com/in/antanas-gargasas-993a4917a/"
              >Antanas Ga.</a
            >
          </h1>
          <h2 class="message descriptor">{{ $t('home.descriptor') }}</h2>
        </div>
        <div class="profile">
          <div class="background"></div>
          <img src="/face.webp" width="420" />
          <div class="wave">
            <HandWave />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HandWave from '@/components/icons/HandWave.vue'

export default defineComponent({
  components: { HandWave },
  data() {
    return {
      moveStart: false,
    }
  },
  created() {
    const splitTitle = document.title.split(' | ')
    const baseTitle = splitTitle.length > 1 ? splitTitle[1] : splitTitle[0]
    document.title = [
      this.$t(`routes.${(this.$route.name as string) || ''}`),
      baseTitle,
    ].join(' | ')
  },
  mounted() {
    window.addEventListener('scroll', this.scroll)
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.scroll)
  },
  methods: {
    scroll() {
      const { scrollY, innerHeight } = window
      const { scrollHeight } = document.documentElement
      const scrollYBottom = scrollY + innerHeight
      if (scrollHeight - 200 > scrollYBottom) {
        return
      } else if (scrollHeight - 1 > scrollY) {
        this.$router.push(`/${this.$i18n.locale}/projects`)
      }
      if (!this.moveStart) {
        window.scroll({ top: scrollHeight, behavior: 'smooth' })
        this.moveStart = true
      }
    },
  },
})
</script>
