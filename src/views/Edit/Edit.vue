<template lang="pug">
section
    h1 Edit existing garment
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
        garment-type-selector(@selected="onGarmentTypeSelected" :selected="form.garment_type")
        place-selector(@selected="onPlaceSelected" :selected="form.place")
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
        resize-image-upload(@loaded="onImageLoaded")
        .mt-4
        b-button.mr-2(type="submit" variant="primary") {{$t('editGarment.save')}}
        b-button(type="reset" variant="danger") {{$t('editGarment.reset')}}
</template>

<script>
import router from "@/router";
import { postImage, getGarment, putGarment } from "@/apis/apis";
import { errorToast, okToast } from "@/helpers/ui";
import GarmentTypeSelector from "@/components/GarmentTypeSelector";
import PlaceSelector from "@/components/PlaceSelector";
import ResizeImageUpload from "@/components/ResizeImageUpload";
export default {
  components: {
    GarmentTypeSelector: GarmentTypeSelector,
    PlaceSelector: PlaceSelector,
    ResizeImageUpload: ResizeImageUpload,
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
    onGarmentTypeSelected(selectedGarmentType) {
      this.form.garment_type = selectedGarmentType;
    },
    onPlaceSelected(selectedPlace) {
      this.form.place = selectedPlace;
    },
    onImageLoaded(newImage) {
      this.form.newImage = newImage;
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
