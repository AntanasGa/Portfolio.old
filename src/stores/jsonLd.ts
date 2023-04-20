import { defineStore } from 'pinia'

export const useJsonLd = defineStore({
  id: 'jsonLd',
  state: (): { el?: HTMLScriptElement } => ({
    el: undefined,
  }),
  actions: {
    set(value: string) {
      !this.el && this.initialize()
      if (!this.el) {
        return
      }
      this.el.innerText = value
    },
    initialize() {
      if (!document || !document.head) {
        return
      }
      const els = Array.from(document.head.getElementsByTagName('script'))
      this.el = els.find(
        (x) => 'application/ld+json' === x.getAttribute('type'),
      )
    },
  },
})
