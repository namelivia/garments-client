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
import GarmentCard from "./GarmentCard";
export default {
  components: {
    garmentCard: GarmentCard,
  },
  props: {
    place: {
      type: String,
      default: null,
    },
  },
  data: function () {
    return {
      garments: [],
      loading: true,
    };
  },
  watch: {
    place: function (newPlace) {
      this.loadList(newPlace);
    },
  },
  methods: {
    async loadList(newPlace) {
      try {
        const response = await this.$axios.get(
          `${process.env.VUE_APP_API_ENDPOINT}/garments?place=${newPlace}`
        );
        this.garments = response.data;
      } catch (err) {
        this.$bvToast.toast(`Garments can't be retrieved`, {
          title: "Error",
          variant: "danger",
          solid: true,
        });
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
