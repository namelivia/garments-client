<template lang="pug">
    b-form(@submit="onSubmit" @reset="onReset"  v-if="show")
        b-form-group(
            id="name-input-group"
            :label="$t('garmentForm.name')"
            label-for="name"
        )
            b-form-input(
                id="name"
                name="name"
                v-model="form.name"
                type="text"
                required
                :placeholder="$t('garmentForm.enterGarmentName')"
            )
        garment-type-selector(@selected="onGarmentTypeSelected")
        place-selector(@selected="onPlaceSelected")
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
        resize-image-upload(@loaded="onImageLoaded")
        .mt-4
        b-button.mr-2(type="submit" variant="primary") {{$t('newGarment.submit')}}
        b-button(type="reset" variant="danger") {{$t('newGarment.reset')}}
</template>
<script>
import GarmentTypeSelector from "@/components/GarmentTypeSelector";
import PlaceSelector from "@/components/PlaceSelector";
import ResizeImageUpload from "@/components/ResizeImageUpload";
import { postImage } from "@/apis/apis";
import { errorToast } from "@/helpers/ui";
export default {
  components: {
    GarmentTypeSelector,
    PlaceSelector,
    ResizeImageUpload,
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
  mounted: function () {},
  methods: {
    onGarmentTypeSelected(selectedGarmentType) {
      this.form.garment_type = selectedGarmentType;
    },
    onPlaceSelected(selectedPlace) {
      this.form.place = selectedPlace;
    },
    onImageLoaded(newImage) {
      this.form.image = newImage;
    },
    async uploadImage() {
      //After creating if the garment upload image if has it
      if (this.form.image) {
        try {
          this.form.image = await postImage(this.form.image);
        } catch (err) {
          this.$bvToast.toast(`Image could not be loaded`, errorToast);
        }
      }
    },
    async onSubmit(evt) {
      if (evt) {
        evt.preventDefault();
      }
      await this.uploadImage();
      this.$emit("submit", this.form);
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
      this.form.image = null;
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>
