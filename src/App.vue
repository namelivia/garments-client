<template lang="pug">
.min-vh-100
    new-navbar(:links="links")
    div(class="container mx-auto")
        router-view
</template>

<script>
import store from './currentUser'
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
      const currentUser = await store.getCurrentUser()
      this.currentUserEmail = currentUser.email
    },
  },
}
</script>

<style lang="css">
@import './assets/styles/custom.css';
</style>
