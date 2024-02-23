<template lang="pug">
div
  card
    card-image(:src="imageUrl" :alt="name" @width="onWidth")
    card-body(:title="name")
      div(class="inline" v-if="!thrown_away")
          regular-button(@click="onWear" :text="$t('garmentCard.wearIt')" v-if="!washing")
          regular-button.ml-2(@click="onWash" :text="$t('garmentCard.washIt')" v-if="washing")
          regular-button.ml-2(name="send-to-wash" @click="onSendToWash" :text="$t('garmentCard.sendToWash')" v-if="!washing")
      router-link(:to="{ name: 'garment', params: { garmentId: id}}")
          secondary-button.ml-2(:text="$t('garmentCard.details')")
</template>
<script>
import { getImageUrl } from '@/apis/helpers'
import { sendToWashGarment, wearGarment, washGarment } from '@/apis/apis'
import { useToast } from 'vue-toastification'
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
    washing: {
      type: Boolean,
    },
    thrown_away: {
      type: Boolean,
    },
    imagePath: {
      type: String,
      default: '@/assets/images/image-placeholder.png',
    },
  },
  data: function () {
    return {
      imageUrl: null,
      imageWidth: undefined,
    }
  },
  watch: {
    imagePath: {
      immediate: true,
      handler: function () {
        this.onWidth(this.imageWidth)
      },
    },
  },
  methods: {
    async onWear(evt) {
      evt.preventDefault()
      const toast = useToast()
      try {
        await wearGarment(this.id)
        toast.success(`Wearing Garment ${this.name}`)
      } catch (err) {
        console.log(err)
        toast.error(`Garment could not be worn`)
      }
    },
    async onSendToWash(evt) {
      evt.preventDefault()
      const toast = useToast()
      try {
        await sendToWashGarment(this.id)
        toast.success(`Garment ${this.name} sent to wash`)
      } catch (err) {
        console.log(err)
        toast.error(`Garment could not be sent to wash`)
      }
    },
    async onWash(evt) {
      evt.preventDefault()
      const toast = useToast()
      try {
        await washGarment(this.id)
        toast.success(`Washing Garment ${this.name}`)
      } catch (err) {
        console.log(err)
        toast.error(`Garment could not be washed`)
      }
    },
    onWidth(width) {
      this.imageWidth = width
      this.imageUrl = getImageUrl(this.imagePath, width)
    },
  },
}
</script>
