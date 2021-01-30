<template lang="pug">
    b-spinner(v-if="loading" label="Loading...")
    b-form-group(
        id="garment_type-input-group"
        :label="$t('newGarment.garment_type')"
        label-for="garment_type"
        v-else
    )
        b-form-select(
            id="garment_type"
            name="garment_type"
            v-model="selectedGarmentType"
            @change="onChange($event)"
            :options="garmentTypeOptions"
        )
</template>
<script>
import { getGarmentTypes } from "@/apis/apis";
export default {
  data() {
    return {
      garmentTypes: [],
      selectedGarmentType: "",
      loading: true,
    };
  },
  computed: {
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
  mounted: function () {
    this.loadGarmentTypes();
  },
  methods: {
    async loadGarmentTypes() {
      try {
        this.garmentTypes = await getGarmentTypes();
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
    onChange(evt) {
      this.$emit("selected", evt);
    },
  },
};
</script>
