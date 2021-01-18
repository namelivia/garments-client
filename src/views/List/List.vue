<template lang="pug">
section
    h1(v-t="'list.title'")
    h4 Showing garments in: {{currentUserLocation}}
    garment-list
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
      currentUserLocation: "place not set",
    };
  },
  mounted() {
    this.getCurrentUser();
  },
  methods: {
    async getCurrentUser() {
      const currentUser = await store.getCurrentUser();
      this.currentUserLocation = currentUser.place;
    },
  },
};
</script>
