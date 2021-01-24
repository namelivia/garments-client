<template lang="pug">
section
    h1(v-t="'list.title'")
    b-form.row
        b-form-group.col-md-5(
            id="garment_type-input-group"
        )
            b-form-select(
                id="garment_type"
                name="garment_type"
                v-model="form.garment_type"
                :options="garmentTypeOptions"
                :garment_typeholder="$t('newGarment.enterGarmentPlace')"
            )
        b-form-group.col-md-5(
            id="place-input-group"
        )
            b-form-select(
                id="place"
                name="place"
                v-model="form.place"
                :options="placeOptions"
                :placeholder="$t('newGarment.enterGarmentPlace')"
            )
    garment-list(
        :place="form.place"
        :garment-type="form.garment_type"
    )
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
      places: [],
      garmentTypes: [],
      form: {
        garment_type: "",
        place: "",
      },
    };
  },
  computed: {
    placeOptions: function () {
      let options = [{ value: "", text: "Select a place", disabled: true }];
      return options.concat(
        this.places.map((place) => {
          return {
            value: place.name,
            text: place.name,
          };
        })
      );
    },
    garmentTypeOptions: function () {
      let options = [{ value: "", text: "Select a type", disabled: true }];
      return options.concat(
        this.garmentTypes.map((garmentType) => {
          return {
            value: garmentType.name,
            text: garmentType.name,
          };
        })
      );
    },
  },
  mounted() {
    this.getCurrentUser();
    this.loadPlaces();
    this.loadGarmentTypes();
  },
  methods: {
    async getCurrentUser() {
      const currentUser = await store.getCurrentUser();
      this.form.place = currentUser.place || "";
    },
    async loadPlaces() {
      try {
        const response = await this.$axios.get(
          `${process.env.VUE_APP_API_ENDPOINT}/places`
        );
        this.places = response.data;
      } catch (err) {
        this.$bvToast.toast(`Places can't be retrieved`, {
          title: "Error",
          variant: "danger",
          solid: true,
        });
      } finally {
        this.loading = false;
      }
    },
    async loadGarmentTypes() {
      try {
        const response = await this.$axios.get(
          `${process.env.VUE_APP_API_ENDPOINT}/garment_types`
        );
        this.garmentTypes = response.data;
      } catch (err) {
        this.$bvToast.toast(`Garment Types can't be retrieved`, {
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
