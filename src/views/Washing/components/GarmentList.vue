<template lang="pug">
section
    h3(v-if='loading' ) Loading...
    b-card-group(v-else columns)
        garment-card(
            v-for='garment in garments' :key='garment.id'
            :id="garment.id"
            :name="garment.name"
            :image-path="garment.image"
        )
</template>

<script>
import GarmentCard from "@/components/GarmentCard";
import { getWashingGarments } from "@/apis/apis";
import { errorToast } from "@/helpers/ui";
export default {
  components: {
    garmentCard: GarmentCard,
  },
  data: function () {
    return {
      garments: [],
      loading: true,
    };
  },
  mounted: function () {
    this.loadList();
  },
  methods: {
    async loadList() {
      try {
        this.garments = await getWashingGarments();
      } catch (err) {
        this.$bvToast.toast(`Garments can't be retrieved`, errorToast);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
