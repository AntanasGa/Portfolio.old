<template>
  <main class="projects" :style="{ opacity }">
    <div class="container">
      <div class="holder">
        <div v-for="(project, index) of projects" :key="index">
          <ProjectDisplay
            @click="onProjectSelectClick"
            :project="project"
            v-model:canActivate="canActivate"
          />
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import type { IProject } from '@/components/types'
import { defineComponent } from 'vue'
import ProjectDisplay from '../components/ProjectDisplay.vue'

export default defineComponent({
  data() {
    return {
      opacity: 0,
      canActivate: true,
      projects: [
        {
          cover: '/project_portfolio.webp',
          title: { lt: 'Portfolio', en: 'Portfolio' },
          summary: {
            lt: 'Projetas nenaudojantis papildomų resursų, supažindinantis su atliekama veikla',
            en: "Project that doesn't use aditional resources as an itroductinary to ongoing and complete projects",
          },
          git: 'https://github.com/AntanasGa/Portfolio',
          technologies: ['vue'],
        },
      ] as IProject[],
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
    this.opacity = 1
    setTimeout(() => {
      window.scroll({ top: 400, behavior: 'smooth' })
      window.addEventListener('scroll', this.scroll)
    }, 10)
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.scroll)
  },
  methods: {
    onProjectSelectClick() {
      this.canActivate = false
      if (window.scrollY > 400) {
        return
      }
      window.scroll({ top: 400, behavior: 'smooth' })
    },
    scroll() {
      const { scrollY } = window
      if (scrollY > 0) {
        if (scrollY < 401) {
          this.opacity = scrollY / 400
        }
        return
      }
      this.$router.push({ name: 'home', params: { locale: this.$i18n.locale } })
    },
  },
  components: { ProjectDisplay },
})
</script>
