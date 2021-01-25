<template lang="pug">
section
    h1 Add new garment
    b-form(@submit="onSubmit" @reset="onReset"  v-if="show")
        b-form-group(
            id="name-input-group"
            :label="$t('newGarment.name')"
            label-for="name"
        )
            b-form-input(
                id="name"
                name="name"
                v-model="form.name"
                type="text"
                required
                :placeholder="$t('newGarment.enterGarmentName')"
            )
        b-form-group(
            id="garment_type-input-group"
            :label="$t('newGarment.garment_type')"
            label-for="garment_type"
        )
            b-form-select(
                id="garment_type"
                name="garment_type"
                v-model="form.garment_type"
                :options="garmentTypeOptions"
                :garment_typeholder="$t('newGarment.enterGarmentPlace')"
            )
        b-form-group(
            id="color-input-group"
            :label="$t('newGarment.color')"
            label-for="color"
        )
            b-form-input(
                id="color"
                name="color"
                v-model="form.color"
                type="text"
                :placeholder="$t('newGarment.enterGarmentColor')"
            )
        b-form-group(
            id="status-input-group"
            :label="$t('newGarment.status')"
            label-for="status"
        )
            b-form-input(
                id="status"
                name="status"
                v-model="form.status"
                type="text"
                :placeholder="$t('newGarment.enterGarmentStatus')"
            )
        b-form-group(
            id="place-input-group"
            :label="$t('newGarment.place')"
            label-for="place"
        )
            b-form-select(
                id="place"
                name="place"
                v-model="form.place"
                :options="placeOptions"
                :placeholder="$t('newGarment.enterGarmentPlace')"
            )
        b-form-group(
            id="image-input-group"
            :label="$t('newGarment.image')"
            label-for="image"
        )
            b-form-file(
                id="image"
                name="image"
                v-model="form.image"
                accept="image/*"
                :placeholder="$t('newGarment.imageForTheGarment')"
                :drop-placeholder="$t('newGarment.imageForTheGarment')"
            )
        .mt-4
        b-button.mr-2(type="submit" variant="primary") {{$t('newGarment.submit')}}
        b-button(type="reset" variant="danger") {{$t('newGarment.reset')}}
</template>

<script>
import router from "@/router";
import {
  getPlaces,
  postImage,
  postGarment,
  getGarmentTypes,
} from "@/apis/apis";
export default {
  data() {
    return {
      form: {
        name: "",
        garment_type: "",
        status: "",
        color: "",
        place: "",
        image: null,
      },
      places: [],
      garmentTypes: [],
      show: true,
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
  mounted: function () {
    this.loadPlaces();
    this.loadGarmentTypes();
  },
  methods: {
    async loadPlaces() {
      try {
        this.places = await getPlaces();
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
    async onSubmit(evt) {
      try {
        evt.preventDefault();
        //After creating if the garment upload image if has it
        if (this.form.image) {
          this.form.image = await postImage(this.form.image);
        }
        postGarment(this.form);
        router.replace("/list", () => {
          this.$root.$bvToast.toast(`Garment ${this.form.name} created`, {
            title: "Success",
            variant: "success",
            solid: true,
          });
        });
      } catch (err) {
        this.$bvToast.toast(`Garment could not be created`, {
          title: "Error",
          variant: "danger",
          solid: true,
        });
      }
    },
    onReset(evt) {
      if (evt) {
        evt.preventDefault();
      }
      this.form.name = "";
      this.form.garment_type = "";
      this.form.color = "";
      this.form.place = "";
      this.form.status = "";
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>
