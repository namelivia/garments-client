<template>
  <div id="mobile-menu" class="sm:hidden">
    <div class="px-2 pt-2 pb-3 space-y-1">
      <mobile-navigation-link
        v-for="link in links"
        :key="link.id"
        :href="link.href"
        :text="link.text"
      />
    </div>
  </div>
</template>
<script>
import MobileNavigationLink from './MobileNavigationLink.vue'

export default {
  components: {
    MobileNavigationLink: MobileNavigationLink,
  },
  props: {
    links: {
      type: Array,
    },
  },
}
</script>
