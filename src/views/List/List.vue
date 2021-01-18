<template lang="pug">
section
    h1(v-t="'list.title'")
    h4 Showing garments in: {{currentUserPlace}}
    garment-list(:place="currentUserPlace")
</template>

<script>
import GarmentList from "./components/GarmentList";
import store from "@/currentUser";
export default {
  components: {
    GarmentList: GarmentList,
  },
  data: function () {
    return {
      currentUserPlace: null,
    };
  },
  mounted() {
    this.getCurrentUser();
  },
  methods: {
    async getCurrentUser() {
      const currentUser = await store.getCurrentUser();
      this.currentUserPlace = currentUser.place;
    },
  },
};
</script>
