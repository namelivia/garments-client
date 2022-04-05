<template lang="pug">
form(@submit="onSubmit" @reset="onReset"  v-if="show")
    text-input(
      :name="name"
      :label="$t('newGarment.name')"
      :placeholder="$t('newGarment.enterGarmentName')"
      @update="garment.name = $event"
      required
    )
    garment-type-selector(@selected="onGarmentTypeSelected" :selected="garment.garment_type")
    place-selector(@selected="onPlaceSelected" :selected="garment.place")
    activity-selector(@selected="onActivitySelected" :selected="garment.activity")
    text-input(
      :name="color"
      :label="$t('newGarment.color')"
      :placeholder="$t('newGarment.enterGarmentColor')"
      @update="garment.color = $event"
      required
    )
    text-input(
      :name="status"
      :label="$t('newGarment.status')"
      :placeholder="$t('newGarment.enterGarmentStatus')"
      @update="garment.status = $event"
      required
    )
    number-input(
      :name="wear-to-wash"
      :label="$t('newGarment.wearToWash')"
      :placeholder="$t('newGarment.enterWearToWash')"
      @update="garment.wear_to_wash = $event"
      required
    )
    resize-image-upload(@loaded="onImageLoaded")
    .mt-4
    submit-button.mr-2(:text="$t('newGarment.submit')")
    reset-button(:text="$t('newGarment.reset')")
</template>
<script>
import GarmentTypeSelector from '@/components/GarmentTypeSelector.vue'
import PlaceSelector from '@/components/PlaceSelector.vue'
import ActivitySelector from '@/components/ActivitySelector.vue'
import { postImage } from '@/apis/apis'
import { useToast } from 'vue-toastification'
export default {
  components: {
    GarmentTypeSelector,
    PlaceSelector,
    ActivitySelector,
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
          activity: '',
          image: null,
          wear_to_wash: 1,
        }
      },
    },
  },
  emits: ['submit'],
  data() {
    return {
      show: true,
      garment: {
        name: '',
        garment_type: '',
        status: '',
        color: '',
        place: '',
        activity: '',
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
    onActivitySelected(selectedActivity) {
      this.garment.activity = selectedActivity
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
          const toast = useToast()
          toast.error(`Image could not be loaded`)
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
      this.garment.activity = ''
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
