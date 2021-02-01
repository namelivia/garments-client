<template lang="pug">
section
    h1 {{ $t("welcome.welcome") }}
    place-selector(@selected="onPlaceSelected")
    garment-type-selector(@selected="onGarmentTypeSelected")
    garment-card(
        v-if="randomGarment !== null"
        :id="randomGarment.id"
        :name="randomGarment.name"
        :image-path="randomGarment.image"
    )
</template>

<script>
import GarmentCard from "@/components/GarmentCard";
import GarmentTypeSelector from "@/components/GarmentTypeSelector";
import PlaceSelector from "@/components/PlaceSelector";
import { getRandomGarment } from "@/apis/apis";
import { errorToast } from "@/helpers/ui";
export default {
  components: {
    garmentCard: GarmentCard,
    GarmentTypeSelector: GarmentTypeSelector,
    PlaceSelector: PlaceSelector,
  },
  data: function () {
    return {
      randomGarment: null,
      form: {
        garment_type: "",
        place: "",
      },
      loading: true,
    };
  },
  methods: {
    onGarmentTypeSelected(selectedGarmentType) {
      this.form.garment_type = selectedGarmentType;
      this.loadRandom();
    },
    onPlaceSelected(selectedPlace) {
      this.form.place = selectedPlace;
      this.loadRandom();
    },
    async loadRandom() {
      if (this.form.place === "" || this.form.garment_type === "") {
        return;
      }
      try {
        this.randomGarment = await getRandomGarment(
          this.form.place,
          this.form.garment_type
        );
      } catch (err) {
        this.$bvToast.toast(`Random can't be retrieved`, errorToast);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
