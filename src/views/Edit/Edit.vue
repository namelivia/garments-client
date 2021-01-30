<template lang="pug">
section
    h1 Edit existing garment
    img.mb-4.img-fluid(:src="imageUrl")
    b-form(@submit="onSubmit" @reset="onReset"  v-if="show")
        b-form-group(
            id="name-input-group"
            :label="$t('editGarment.name')"
            label-for="name"
        )
            b-form-input(
                id="name"
                name="name"
                v-model="form.name"
                type="text"
                required
                :placeholder="$t('editGarment.enterGarmentName')"
            )
        b-form-group(
            id="garment_type-input-group"
            :label="$t('editGarment.garment_type')"
            label-for="garment_type"
        )
            b-form-select(
                id="garment_type"
                name="garment_type"
                v-model="form.garment_type"
                :options="garmentTypeOptions"
                :garment_typeholder="$t('editGarment.enterGarmentPlace')"
            )
        b-form-group(
            id="color-input-group"
            :label="$t('editGarment.color')"
            label-for="color"
        )
            b-form-input(
                id="color"
                name="color"
                v-model="form.color"
                type="text"
                :placeholder="$t('editGarment.enterGarmentColor')"
            )
        b-form-group(
            id="status-input-group"
            :label="$t('editGarment.status')"
            label-for="status"
        )
            b-form-input(
                id="status"
                name="status"
                v-model="form.status"
                type="text"
                :placeholder="$t('editGarment.enterGarmentStatus')"
            )
        b-form-group(
            id="place-input-group"
            :label="$t('editGarment.place')"
            label-for="place"
        )
            b-form-select(
                id="place"
                name="place"
                v-model="form.place"
                :options="placeOptions"
                :placeholder="$t('editGarment.enterGarmentPlace')"
            )
        b-form-group(
            id="image-input-group"
            :label="$t('newGarment.image')"
            label-for="image"
        )
            b-form-file(
                id="image"
                name="image"
                v-model="form.newImage"
                accept="image/*"
                :placeholder="$t('newGarment.imageForTheGarment')"
                :drop-placeholder="$t('newGarment.imageForTheGarment')"
            )
        .mt-4
        b-button.mr-2(type="submit" variant="primary") {{$t('editGarment.save')}}
        b-button(type="reset" variant="danger") {{$t('editGarment.reset')}}
</template>

<script>
import router from "@/router";
import {
  getPlaces,
  postImage,
  getGarment,
  putGarment,
  getGarmentTypes,
} from "@/apis/apis";
import { getImageUrl } from "@/apis/helpers";
import { errorToast, okToast } from "@/helpers/ui";
export default {
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
    imageUrl: function () {
      if (this.form.image) {
        getImageUrl(this.form.image);
      }
      return null;
    },
  },
  mounted: function () {
    this.loadGarment();
    this.loadPlaces();
    this.loadGarmentTypes();
  },
  methods: {
    async loadPlaces() {
      try {
        this.places = await getPlaces();
      } catch (err) {
        this.$bvToast.toast(`Places can't be retrieved`, errorToast);
      } finally {
        this.loading = false;
      }
    },
    async loadGarmentTypes() {
      try {
        this.garmentTypes = await getGarmentTypes();
      } catch (err) {
        this.$bvToast.toast(`Garment Types can't be retrieved`, errorToast);
      } finally {
        this.loading = false;
      }
    },
    async loadGarment() {
      try {
        const garment = await getGarment(this.garmentId);
        //TODO: This can probably be done in an oneliner
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
    async onSubmit(evt) {
      try {
        evt.preventDefault();
        //After creating if the garment upload image if has it
        if (this.form.newImage) {
          this.form.image = await postImage(this.form.newImage);
        }
        putGarment(this.garmentId, this.form);
        router.replace("/list", () => {
          this.$root.$bvToast.toast(
            `Garment ${this.form.name} created`,
            okToast
          );
        });
      } catch (err) {
        this.$bvToast.toast(`Garment could not be created`, errorToast);
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
