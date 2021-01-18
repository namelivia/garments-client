<template lang="pug">
.garments-background.min-vh-100
    b-navbar(toggleable="lg" type="dark" variant="info")
        b-navbar-brand(to="/")
            span(v-t="'navigation.title'")
        b-navbar-toggle(target="nav-collapse")
        b-collapse(id="nav-collapse" is-nav)
            b-navbar-nav
                b-nav-item(to="/list")
                  span(v-t="'navigation.list'")
                b-nav-item(to="/new")
                  span(v-t="'navigation.new'")
                b-nav-item(to="/new-place")
                  span(v-t="'navigation.new-place'")
            b-navbar-nav.ml-auto
                b-nav-item {{ $i18n.locale }}
                b-nav-item {{ currentUserEmail }}
    b-container.bg-light.text-dark.pb-4.pt-4
        router-view
</template>

<script>
import store from "./currentUser";
export default {
  data: function () {
    return {
      currentUserEmail: undefined,
    };
  },
  mounted() {
    this.getCurrentUser();
  },
  methods: {
    async getCurrentUser() {
      const currentUser = await store.getCurrentUser();
      this.currentUserEmail = currentUser.email;
    },
  },
};
</script>

<style lang="scss">
@import "./assets/styles/custom.scss";
@import "../node_modules/bootstrap/dist/css/bootstrap.css";
@import "../node_modules/bootstrap-vue/dist/bootstrap-vue.css";
</style>
