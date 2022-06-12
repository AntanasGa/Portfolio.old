<template>
  <div class="navigation">
    <nav class="navigation__buttons">
      <button class="navigation__button main" type="button" @click="navClick">
        <NavButton :active="navContext" />
      </button>
      <div class="context" :class="{ shown: navContext }">
        <div class="context__items">
          <RouterLink
            class="navigation__button"
            type="button"
            @click="closeNav()"
            :to="{ name: 'home', params: { locale: $i18n.locale } }"
            :tabindex="navContext ? undefined : -1"
            ><HomeLink
          /></RouterLink>
          <RouterLink
            class="navigation__button"
            type="button"
            @click="closeNav()"
            :to="{ name: 'projects', params: { locale: $i18n.locale } }"
            :tabindex="navContext ? undefined : -1"
            ><ProjectLink
          /></RouterLink>
          <button
            class="navigation__button"
            type="button"
            :tabindex="navContext ? undefined : -1"
            @click="clickSubmenu('locale')"
          >
            <TranslationIcon />
          </button>
          <div class="context__submenu-holder">
            <div class="context__submenu">
              <div
                class="context__submenu--item locale-select"
                :class="{ active: subNav == 'locale' }"
              >
                <button class="navigation__button" @click="setLocale('lt')">
                  <h2>Lietuvių</h2>
                </button>
                <button class="navigation__button" @click="setLocale('en')">
                  <h2>English</h2>
                </button>
              </div>
            </div>
          </div>
          <button
            class="navigation__button"
            type="button"
            :tabindex="navContext ? undefined : -1"
            @click="clickSubmenu('lighting')"
          >
            <ThemeLight v-if="lighting.mode === 'light'" />
            <ThemeDark v-else-if="lighting.mode === 'dark'" />
            <ThemeDevice v-else />
          </button>
          <div class="context__submenu-holder">
            <div class="context__submenu">
              <div
                class="context__submenu--item theme-items"
                :class="{ active: subNav == 'lighting' }"
              >
                <button
                  class="theme-selector"
                  type="button"
                  :tabindex="subNav == 'lighting' ? undefined : -1"
                  @click="setMode('auto')"
                >
                  <ThemeDevice />
                  <div class="theme-selector__description">
                    <h2>Device theme</h2>
                  </div>
                </button>
                <button
                  class="theme-selector"
                  type="button"
                  :tabindex="subNav == 'lighting' ? undefined : -1"
                  @click="setMode('light')"
                >
                  <ThemeLight />
                  <div class="theme-selector__description">
                    <h2>Light theme</h2>
                  </div>
                </button>
                <button
                  class="theme-selector"
                  type="button"
                  :tabindex="subNav == 'lighting' ? undefined : -1"
                  @click="setMode('dark')"
                  @blur="clickSubmenu('lighting')"
                >
                  <ThemeDark />
                  <div class="theme-selector__description">
                    <h2>Dark theme</h2>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script lang="ts">
import { useLightingStore } from '@/stores/lighting'
import { defineComponent } from 'vue'
import ThemeDevice from './icons/theme/ThemeDevice.vue'
import ThemeLight from './icons/theme/ThemeLight.vue'
import ThemeDark from './icons/theme/ThemeDark.vue'
import NavButton from './icons/NavButton.vue'
import { RouterLink } from 'vue-router'
import HomeLink from './icons/HomeLink.vue'
import ProjectLink from './icons/ProjectLink.vue'
import TranslationIcon from './icons/TranslationIcon.vue'
import locales from '../i18n/locales'

type Locales = typeof locales[number]

export default defineComponent({
  setup() {
    const lighting = useLightingStore()
    return { lighting }
  },
  data() {
    return {
      navContext: false,
      subNav: '' as 'locale' | 'lighting' | '',
    }
  },
  methods: {
    setMode(mode: 'light' | 'dark' | 'auto') {
      const modes: typeof mode[] = ['light', 'dark', 'auto']
      if (!modes.includes(mode)) {
        return
      }
      this.lighting.mode = mode
      document.cookie = `theme=${mode}; path=/; SameSite=Strict; Secure`
      mode = mode === 'auto' ? this.lighting.preferred || 'light' : mode
      switch (mode) {
        case 'dark':
          document.documentElement.setAttribute('class', 'dark')
          break
        case 'light':
          document.documentElement.removeAttribute('class')
      }
      this.closeNav()
    },
    setLocale(locale: Locales) {
      if (!locales.includes(locale)) {
        return
      }
      document.cookie = `locale=${locale}; path=/; SameSite=Strict; Secure`
      this.$i18n.locale = locale
      this.$router.replace({ params: { locale } })
      this.closeNav()
    },
    closeNav() {
      this.navContext = false
      this.subNav = ''
    },
    clickSubmenu(submenu: 'lighting' | 'locale') {
      this.subNav = this.subNav != submenu ? submenu : ''
    },
    navClick() {
      this.navContext = !this.navContext
      this.subNav = ''
    },
  },
  components: {
    RouterLink,
    ThemeDevice,
    ThemeLight,
    ThemeDark,
    NavButton,
    HomeLink,
    ProjectLink,
    TranslationIcon,
  },
})
</script>
