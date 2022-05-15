<template>
  <svg
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    class="mutatable f nav-icon"
  >
    <path
      d="M12 0a12 12 0 1 0 0 24 12 12 0 1 0 0-24zM6 10.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 1 1 0-3zm6 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 1 1 0-3zm6 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 1 1 0-3z"
      :style="{ opacity: active ? 0 : 0.7 }"
    />
    <path
      d="M12 0a12 12 0 1 0 0 24 12 12 0 1 0 0-24zM7.514 5.398c.542 0 1.085.208 1.5.623l2.998 2.998 2.998-2.998c.831-.831 2.167-.831 2.998 0s.831 2.167 0 2.998l-2.998 2.998 2.998 2.998a2.12 2.12 0 0 1 0 3c-.831.831-2.167.831-2.998 0l-2.998-2.998-2.998 2.998a2.12 2.12 0 1 1-3-3l2.998-2.998L6.014 9.02c-.831-.831-.831-2.167 0-2.998.415-.415.958-.623 1.5-.623z"
      :style="{ opacity: active ? 0.7 : 0 }"
    />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },
})
</script>

<style lang="sass">
.nav-icon > *
  transition: opacity 0.2s
</style>
