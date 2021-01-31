<template lang="pug">
section
    h1 Edit existing garment
    garment-form(@submit="onSubmit" :initial-data="form")
</template>

<script>
import router from "@/router";
import { getGarment, putGarment } from "@/apis/apis";
import { errorToast, okToast } from "@/helpers/ui";
import GarmentForm from "@/components/GarmentForm";
import GarmentTypeSelector from "@/components/GarmentTypeSelector";
import PlaceSelector from "@/components/PlaceSelector";
import ResizeImageUpload from "@/components/ResizeImageUpload";
export default {
  components: {
    GarmentTypeSelector,
    PlaceSelector,
    ResizeImageUpload,
    GarmentForm,
  },
  props: {
    garmentId: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      form: {
        name: "",
        garment_type: "",
        status: "",
        color: "",
        place: "",
        image: null,
        newImage: null,
      },
      show: true,
    };
  },
  mounted: function () {
    this.loadGarment();
  },
  methods: {
    async loadGarment() {
      try {
        const garment = await getGarment(this.garmentId);
        //TODO: I can't do this using the spread operator
        this.form.name = garment.name;
        this.form.garment_type = garment.garment_type;
        this.form.color = garment.color;
        this.form.status = garment.status;
        this.form.place = garment.place;
        this.form.image = garment.image;
      } catch (err) {
        this.$bvToast.toast(`Garment can't be retrieved`, errorToast);
      } finally {
        this.loading = false;
      }
    },
    async onSubmit(data) {
      try {
        putGarment(this.garmentId, data);
        router.replace("/list", () => {
          this.$root.$bvToast.toast(
            `Garment ${this.form.name} created`,
            okToast
          );
        });
      } catch (err) {
        this.$bvToast.toast(`Garment could not be updated`, errorToast);
      }
    },
  },
};
</script>
