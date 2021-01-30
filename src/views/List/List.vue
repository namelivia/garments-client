<template lang="pug">
section
    h1(v-t="'list.title'")
    b-form.row
        garment-type-selector(@selected="onGarmentTypeSelected")
        place-selector(@selected="onPlaceSelected")
    garment-list(
        :place="form.place"
        :garment-type="form.garment_type"
    )
</template>

<script>
import GarmentList from "./components/GarmentList";
import GarmentTypeSelector from "@/components/GarmentTypeSelector";
import PlaceSelector from "@/components/PlaceSelector";
import store from "@/currentUser";
export default {
  components: {
    GarmentList: GarmentList,
    GarmentTypeSelector: GarmentTypeSelector,
    PlaceSelector: PlaceSelector,
  },
  data: function () {
    return {
      form: {
        garment_type: "",
        place: "",
      },
    };
  },
  mounted() {
    this.getCurrentUser();
  },
  methods: {
    async getCurrentUser() {
      const currentUser = await store.getCurrentUser();
      this.form.place = currentUser.place || "";
    },
    onGarmentTypeSelected(selectedGarmentType) {
      this.form.garment_type = selectedGarmentType;
    },
    onPlaceSelected(selectedPlace) {
      this.form.place = selectedPlace;
    },
  },
};
</script>
