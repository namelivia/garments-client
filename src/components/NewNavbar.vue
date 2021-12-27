<template>
  <nav class="bg-gray-800">
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <mobile-menu-button />
        </div>
        <div
          class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start"
        >
          <navbar-title />
          <navigation-links :links="links" />
        </div>
        <right-content />
      </div>
    </div>
    <mobile-navigation-links :links="links" />
  </nav>
</template>
<script>
import MobileNavigationLinks from './MobileNavigationLinks.vue'
import NavigationLinks from './NavigationLinks.vue'
import NavbarTitle from './NavbarTitle.vue'
import RightContent from './RightContent.vue'
import MobileMenuButton from './MobileMenuButton.vue'

export default {
  components: {
    NavbarTitle: NavbarTitle,
    NavigationLinks: NavigationLinks,
    MobileNavigationLinks: MobileNavigationLinks,
    RightContent: RightContent,
    MobileMenuButton: MobileMenuButton,
  },
  props: {
    links: {
      type: Array,
    },
  },
}
</script>
