<template lang="pug">
div
  card
    card-image(:src="imageUrl" :alt="name" @width="onWidth")
    card-body(:title="name")
      router-link(:to="{ name: 'garment', params: { garmentId: id}}")
          secondary-button.ml-2(:text="$t('garmentCard.details')")
</template>
<script>
import { getImageUrl } from '@/apis/helpers'
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
    onWidth(width) {
      this.imageWidth = width
      this.imageUrl = getImageUrl(this.imagePath, width)
    },
  },
}
</script>
