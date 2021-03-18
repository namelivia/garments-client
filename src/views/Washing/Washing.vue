<template lang="pug">
section
    h1(v-t="'washing.title'")
    garment-list()
</template>

<script>
import GarmentList from "./components/GarmentList";
export default {
  components: {
    GarmentList: GarmentList,
  },
};
</script>
