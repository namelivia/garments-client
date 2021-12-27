<template>
  <div class="hidden sm:block sm:ml-6">
    <div class="flex space-x-4">
      <navigation-link
        v-for="link in links"
        :key="link.id"
        :href="link.href"
        :text="link.text"
      />
    </div>
  </div>
</template>
<script>
import NavigationLink from './NavigationLink.vue'

export default {
  components: {
    NavigationLink: NavigationLink,
  },
  props: {
    links: {
      type: Array,
    },
  },
}
</script>
