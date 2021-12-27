<template lang="pug">
div
  card
    card-image(:src="imageUrl" :alt="name")
    card-body(:title="name")
      regular-button(@click="onWear" :text="$t('garmentCard.wearIt')")
      regular-button(@click="onWash" :text="$t('garmentCard.washIt')")
      router-link(:to="{ name: 'garment', params: { garmentId: id}}")
          secondary-button(:text="$t('garmentCard.details')")
</template>
<script>
import { getImageUrl } from '@/apis/helpers'
import { wearGarment, washGarment } from '@/apis/apis'
//import { errorToast, okToast } from '@/helpers/ui'
export default {
  props: {
    name: {
      type: String,
      default: '',
    },
    id: {
      type: Number,
      default: 0,
    },
    imagePath: {
      type: String,
      default: '@/assets/images/image-placeholder.png',
    },
  },
  data: function () {
    return {
      imageWidth: 0,
    }
  },
  computed: {
    imageUrl: function () {
      if (this.imagePath && this.imageWidth) {
        return getImageUrl(this.imagePath, this.imageWidth)
      }
      return null
    },
  },
  mounted: function () {
    this.calculateWidth()
  },
  methods: {
    async onWear(evt) {
      evt.preventDefault()
      try {
        await wearGarment(this.id)
        //this.$bvToast.toast(`Wearing Garment ${this.name}`, okToast)
      } catch (err) {
        console.log(err)
        //this.$bvToast.toast(`Garment could not be worn`, errorToast)
      }
    },
    async onWash(evt) {
      evt.preventDefault()
      try {
        await washGarment(this.id)
        //this.$bvToast.toast(`Washing Garment ${this.name}`, okToast)
      } catch (err) {
        console.log(err)
        //this.$bvToast.toast(`Garment could not be washed`, errorToast)
      }
    },
    calculateWidth() {
      this.imageWidth = this.$refs.image.$el.clientWidth
    },
  },
}
</script>
