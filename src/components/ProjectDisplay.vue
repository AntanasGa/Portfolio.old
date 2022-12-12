<template>
  <div :class="{ active }" tabindex="0">
    <article ref="content">
      <header ref="header">
        <figure>
          <img :src="project.cover" width="120" />
        </figure>
        <h1 v-text="project.title[$i18n.locale]" />
      </header>
      <section ref="body">
        <summary
          v-if="project.summary"
          v-text="project.summary[$i18n.locale]"
        />
        <article v-if="active && project.technologies">
          <h2>{{ $t('projects.tech') }}</h2>
          <div class="tech">
            <a
              href="https://vuejs.org/"
              target="_blank"
              rel="noopener"
              v-if="project.technologies.includes('vue')"
            >
              <VueIcon />
              <p>Vue.js</p>
            </a>
            <a
              href="https://reactjs.org/"
              target="_blank"
              rel="noopener"
              v-if="project.technologies.includes('react')"
            >
              <ReactIcon />
              <p>React.js</p>
            </a>
            <a
              href="https://www.rust-lang.org/"
              target="_blank"
              rel="noopener"
              v-if="project.technologies.includes('rust')"
            >
              <RustIcon />
              <p>Rust</p>
            </a>
          </div>
        </article>
      </section>
      <footer>
        <div>
          <a
            :href="project.git"
            class="git"
            v-if="project.git"
            target="_blank"
            rel="noopener"
            ><GitPage />Git</a
          >
        </div>
        <div>
          <a
            :href="project.demo"
            class="demo"
            v-if="project.demo"
            target="_blank"
            rel="noopener"
            >Demo<PlayIcon
          /></a>
        </div>
      </footer>
    </article>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import GitPage from './icons/GitPage.vue'
import PlayIcon from './icons/PlayIcon.vue'
import type { IProject } from './types'
import VueIcon from './icons/VueIcon.vue'
import ReactIcon from './icons/ReactIcon.vue'
import RustIcon from './icons/RustIcon.vue'

interface IPositions {
  x: number
  y: number
  w: number
  h: number
  iw?: number
  ih?: number
}

export default defineComponent({
  props: {
    canActivate: Boolean,
    project: {
      type: Object as () => IProject,
      required: true,
    },
  },
  data() {
    return {
      initialInset: {} as IPositions,
      active: false,
    }
  },
  emits: ['click', 'update:canActivate'],
  mounted() {
    this.project
    this.$el.addEventListener('click', this.enterAnimation)
    this.$el.addEventListener('keydown', this.keyboardWrapper)
  },
  methods: {
    keyboardWrapper(e: KeyboardEvent) {
      if (e.isComposing || e.keyCode === 229 || this.active) {
        return
      }
      if (e.key !== ' ' && e.key !== 'Enter') {
        return
      }
      this.enterAnimation(e)
    },
    enterAnimation(e: Event) {
      if (!this.canActivate) {
        return
      }
      const target = e.target as Element
      if (target.tagName === 'A') {
        return
      }
      const el = this.$el as HTMLElement
      const content = this.$refs['content'] as HTMLElement
      content.removeEventListener('click', this.enterAnimation)
      this.$emit('click')
      const { x, y, width: w, height: h } = el.getBoundingClientRect()
      const pos = { x, y, w, h }
      this.initialInset = {
        ...pos,
        iw: w,
        ih: h,
        w: document.documentElement.clientWidth - pos.x - w,
        h: document.documentElement.clientHeight - pos.y - h,
      }
      const order: (keyof IPositions)[] = ['y', 'w', 'h', 'x']
      const inset = order.map((el) => `${this.initialInset[el]}px`).join(' ')
      window.requestAnimationFrame(() => {
        el.style.position = 'fixed'
        el.style.zIndex = '1'
        el.style.inset = inset
        el.style.aspectRatio = 'unset'
        el.style.display = 'flex'
        el.style.justifyContent = 'center'
        el.style.maxHeight = 'unset'
        content.style.minWidth = `${w}px`
        content.style.height = `${this.initialInset.iw}px`
        content.style.width = `${w}px`
        window.requestAnimationFrame(() => {
          el.style.inset = '0'
          content.style.marginTop = `${
            document.documentElement.clientHeight / 2.3
          }px`
          window.requestAnimationFrame(() => {
            content.style.height = '100vh'
          })
          content.style.width = '90%'
          const onEnd = (e: Event) => {
            if (el !== e.target) {
              return
            }
            this.active = true
            window.requestAnimationFrame(async () => {
              el.scroll({ top: 75, behavior: 'smooth' })
              setTimeout(() => {
                el.addEventListener('scroll', this.onScroll)
              }, 25)
            })
            el.removeEventListener('transitionend', onEnd)
          }
          el.addEventListener('transitionend', onEnd)
        })
      })
    },
    leaveAnimation() {
      const el = this.$el as HTMLElement
      const {
        x,
        y,
        width: w,
        height: h,
      } = el.parentElement?.getBoundingClientRect() || {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
      }
      const pos: IPositions = {
        x,
        y,
        w: document.documentElement.clientWidth - x - w,
        h: document.documentElement.clientHeight - y - h,
      }
      this.$el.removeEventListener('scroll', this.onScroll)
      const content = this.$refs['content'] as HTMLElement
      this.active = false
      window.requestAnimationFrame(() => {
        content.style.minWidth = `${w}px`
        content.style.height = `${h}px`
        content.style.marginTop = ''
        const order: (keyof IPositions)[] = ['y', 'w', 'h', 'x']
        const inset = order.map((el) => `${pos[el]}px`).join(' ')
        el.style.inset = inset
      })
      const afterClose = (e: Event) => {
        if (el !== e.target) {
          return
        }
        window.requestAnimationFrame(() => {
          el.style.position = ''
          el.style.inset = ''
          el.style.aspectRatio = ''
          el.style.display = ''
          el.style.justifyContent = ''
          el.style.zIndex = ''
          el.style.maxHeight = ''
          content.style.height = ''
          content.style.minWidth = ''
          content.style.width = ''
          this.$emit('update:canActivate', true)
        })
        el.removeEventListener('transitionend', afterClose)
        el.addEventListener('click', this.enterAnimation)
      }
      el.addEventListener('transitionend', afterClose)
    },
    onScroll(e: Event) {
      const content = this.$refs['content'] as HTMLElement
      const { scrollTop } = e.target as HTMLElement
      if (scrollTop < 1) {
        this.leaveAnimation()
      }
      const buffer = document.documentElement.clientHeight / 4
      const indentBy = (10 * scrollTop) / buffer + 90
      content.style.width = `${indentBy > 100 ? 100 : indentBy}%`
    },
  },
  components: { GitPage, PlayIcon, VueIcon, ReactIcon, RustIcon },
})
</script>
