<template lang="pug">
section
    h1 Add new garment
    garment-form(@submit="onSubmit")
</template>

<script>
import router from "@/router";
import GarmentForm from "@/components/GarmentForm";
import { postGarment } from "@/apis/apis";
import { errorToast, okToast } from "@/helpers/ui";
export default {
  components: {
    GarmentForm,
  },
  methods: {
    async onSubmit(data) {
      try {
        postGarment(data);
        router.replace("/list", () => {
          this.$root.$bvToast.toast(`Garment ${data.name} created`, okToast);
        });
      } catch (err) {
        this.$bvToast.toast(`Garment could not be created`, errorToast);
      }
    },
  },
};
</script>
