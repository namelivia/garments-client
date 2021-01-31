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
            v-model="selected"
            @change="onChange($event)"
            :options="garmentTypeOptions"
        )
</template>
<script>
import { getGarmentTypes } from "@/apis/apis";
import { errorToast } from "@/helpers/ui";
export default {
  props: {
    selected: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      garmentTypes: [],
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
        this.$bvToast.toast(`Garment Types can't be retrieved`, errorToast);
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
