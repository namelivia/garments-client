<template lang="pug">
div
  card
    card-image(:src="imageUrl" :alt="name" @width="onWidth")
    card-body(:title="name")
    danger-button(@click="onReject" :name="'reject-'+id" :text="$t('outfitGarmentCard.reject')")
      router-link(:to="{ name: 'garment', params: { garmentId: id}}")
          secondary-button.ml-2(:text="$t('outfitGarmentCard.details')")
</template>
<script>
import { getImageUrl } from '@/apis/helpers'
import { rejectOutfitGarment } from '@/apis/apis'
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
    outfitId: {
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
    async onReject(evt) {
      evt.preventDefault()
      const toast = useToast()
      try {
        await rejectOutfitGarment(this.outfitId, this.id)
        toast.success(`Rejecting outfit garment ${this.name}`)
      } catch (err) {
        console.log(err)
        toast.error(`Garment could not be rejected`)
      }
    },
    onWidth(width) {
      this.imageWidth = width
      this.imageUrl = getImageUrl(this.imagePath, width)
    },
  },
}
</script>
