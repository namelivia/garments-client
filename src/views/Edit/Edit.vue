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
        return process.env.VUE_APP_API_ENDPOINT + this.form.image;
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
    async loadGarment() {
      try {
        const response = await this.$axios.get(
          `${process.env.VUE_APP_API_ENDPOINT}/garments/${this.garmentId}`
        );
        this.form.name = response.data.name;
        this.form.garment_type = response.data.garment_type;
        this.form.color = response.data.color;
        this.form.status = response.data.status;
        this.form.place = response.data.place;
        this.form.image = response.data.image;
      } catch (err) {
        this.$bvToast.toast(`Garment can't be retrieved`, {
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
        if (this.form.newImage) {
          let formData = new FormData();
          formData.append("media", this.form.newImage);
          let newImage = await this.$axios.post(
            `${process.env.VUE_APP_API_ENDPOINT}/image`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          this.form.image = newImage.data.location;
        }
        await this.$axios.put(
          `${process.env.VUE_APP_API_ENDPOINT}/garments/${this.garmentId}`,
          this.form
        );
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
