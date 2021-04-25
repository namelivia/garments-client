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
                v-model="garment.name"
                type="text"
                required
                :placeholder="$t('garmentForm.enterGarmentName')"
            )
        garment-type-selector(@selected="onGarmentTypeSelected" :selected="garment.garment_type")
        place-selector(@selected="onPlaceSelected" :selected="garment.place")
        b-form-group(
            id="color-input-group"
            :label="$t('newGarment.color')"
            label-for="color"
        )
            b-form-input(
                id="color"
                name="color"
                v-model="garment.color"
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
                v-model="garment.status"
                type="text"
                :placeholder="$t('newGarment.enterGarmentStatus')"
            )
        b-form-group(
            id="wear-to-wash-input-group"
            :label="$t('newGarment.wearToWash')"
            label-for="wear-to-wash"
        )
            b-form-input(
                id="wear-to-wash"
                name="wear-to-wash"
                v-model="garment.wear_to_wash"
                type="number"
                min="1"
                :placeholder="$t('newGarment.enterWearToWash')"
            )
        resize-image-upload(@loaded="onImageLoaded")
        .mt-4
        b-button.mr-2(type="submit" variant="primary") {{$t('newGarment.submit')}}
        b-button(type="reset" variant="danger") {{$t('newGarment.reset')}}
</template>
<script>
import GarmentTypeSelector from '@/components/GarmentTypeSelector'
import PlaceSelector from '@/components/PlaceSelector'
import ResizeImageUpload from '@/components/ResizeImageUpload'
import { postImage } from '@/apis/apis'
import { errorToast } from '@/helpers/ui'
export default {
  components: {
    GarmentTypeSelector,
    PlaceSelector,
    ResizeImageUpload,
  },
  props: {
    initialData: {
      type: Object,
      default: () => {
        return {
          name: '',
          garment_type: '',
          status: '',
          color: '',
          place: '',
          image: null,
          wear_to_wash: 1,
        }
      },
    },
  },
  data() {
    return {
      show: true,
      garment: {
        name: '',
        garment_type: '',
        status: '',
        color: '',
        place: '',
        image: null,
      },
    }
  },
  watch: {
    initialData: {
      immediate: true,
      handler: function (newData) {
        this.garment = newData
      },
    },
  },
  methods: {
    onGarmentTypeSelected(selectedGarmentType) {
      this.garment.garment_type = selectedGarmentType
    },
    onPlaceSelected(selectedPlace) {
      this.garment.place = selectedPlace
    },
    onImageLoaded(newImage) {
      this.garment.image = newImage
    },
    async uploadImage() {
      //After creating if the garment upload image if has it
      if (this.garment.image) {
        try {
          this.garment.image = await postImage(this.garment.image)
        } catch (err) {
          this.$bvToast.toast(`Image could not be loaded`, errorToast)
        }
      }
    },
    async onSubmit(evt) {
      if (evt) {
        evt.preventDefault()
      }
      await this.uploadImage()
      this.$emit('submit', this.garment)
    },
    onReset(evt) {
      if (evt) {
        evt.preventDefault()
      }
      this.garment.name = ''
      this.garment.garment_type = ''
      this.garment.color = ''
      this.garment.place = ''
      this.garment.status = ''
      this.garment.image = null
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
  },
}
</script>
