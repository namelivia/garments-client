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
        garment-type-selector(@selected="onGarmentTypeSelected")
        place-type-selector(@selected="onPlaceSelected")
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
import GarmentTypeSelector from "@/components/GarmentTypeSelector";
import PlaceSelector from "@/components/PlaceSelector";
import { postImage, postGarment } from "@/apis/apis";
export default {
  components: {
    GarmentTypeSelector: GarmentTypeSelector,
    PlaceSelector: PlaceSelector,
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
      },
      show: true,
    };
  },
  computed: {},
  methods: {
    onGarmentTypeSelected(selectedGarmentType) {
      this.form.garment_type = selectedGarmentType;
    },
    onPlaceSelected(selectedPlace) {
      this.form.place = selectedPlace;
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
