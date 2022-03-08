<template lang="pug">
.h-screen
  navbar(:links="links" :locale="$i18n.locale" :current-user-email="currentUserEmail")
  container
      router-view
</template>

<script>
import { store } from '@namelivia/vue-currentuser'
export default {
  data: function () {
    return {
      currentUserEmail: undefined,
      links: [
        { id: 1, text: this.$i18n.t('navigation.list'), href: '/list' },
        { id: 2, text: this.$i18n.t('navigation.new'), href: '/new' },
        {
          id: 3,
          text: this.$i18n.t('navigation.new-place'),
          href: '/new-place',
        },
        {
          id: 4,
          text: this.$i18n.t('navigation.new-garment-type'),
          href: '/new-garment-type',
        },
        { id: 5, text: this.$i18n.t('navigation.washing'), href: '/washing' },
      ],
    }
  },
  mounted() {
    this.getCurrentUser()
  },
  methods: {
    async getCurrentUser() {
      const currentUser = await store.getCurrentUser(
        import.meta.env.VITE_APP_API_ENDPOINT,
      )
      this.currentUserEmail = currentUser.email
    },
  },
}
</script>

<style lang="css">
@import './assets/styles/custom.css';
@import 'vue-toastification/dist/index.css';
</style>
