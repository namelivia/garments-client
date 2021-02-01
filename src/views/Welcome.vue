<template lang="pug">
section
    h1 {{ $t("welcome.welcome") }}
    b-spinner(v-if="loading" label="Loading...")
    garment-card(
        v-else
        :id="randomGarment.id"
        :name="randomGarment.name"
        :image-path="randomGarment.image"
    )
</template>

<script>
import GarmentCard from "@/components/GarmentCard";
import { getRandomGarment } from "@/apis/apis";
import { errorToast } from "@/helpers/ui";
export default {
  components: {
    garmentCard: GarmentCard,
  },
  data: function () {
    return {
      randomGarment: null,
      loading: true,
    };
  },
  mounted() {
    this.loadRandom();
  },
  methods: {
    async loadRandom() {
      try {
        this.randomGarment = await getRandomGarment();
      } catch (err) {
        this.$bvToast.toast(`Random can't be retrieved`, errorToast);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
