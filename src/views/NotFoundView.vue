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
  created() {
    const splitTitle = document.title.split(' | ')
    const baseTitle = splitTitle.length > 1 ? splitTitle[1] : splitTitle[0]
    document.title = [this.$t('routes.notFound'), baseTitle].join(' | ')
  },
  components: { RouterLink },
})
</script>
