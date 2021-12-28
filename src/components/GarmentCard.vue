<template lang="pug">
div
  card
    card-image(:src="imageUrl" :alt="name" @width="onWidth")
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
      imageUrl: null,
    }
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
    onWidth(width) {
      this.imageUrl = getImageUrl(this.imagePath, width)
    },
  },
}
</script>
