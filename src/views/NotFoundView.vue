<template>
  <main class="notFound">
    <p>
      {{ $t('notFound.before') }}
      <RouterLink
        :to="{ name: 'home', params: { locale: $route.params.locale } }"
        >{{ $t('notFound.link') }} -></RouterLink
      >
    </p>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { RouterLink } from 'vue-router'

export default defineComponent({
  components: { RouterLink },
})
</script>

<style lang="sass">
.notFound
  display: flex
  justify-content: center
  align-items: center
  height: 100vh

  p
    width: 100%
    border-radius: 1rem
    padding: 1rem
    background: var(--item-background)
    max-width: 25rem
</style>
