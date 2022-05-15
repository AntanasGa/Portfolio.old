import { defineStore } from 'pinia'

export const useLightingStore = defineStore({
  id: 'Lighting',
  state: () => ({
    mode: 'auto' as 'light' | 'dark' | 'auto',
    preferred: undefined as 'light' | 'dark' | undefined,
  }),
})
