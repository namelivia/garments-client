<template lang="pug">
    loading(v-if='resizing')
    image-input(
      :label="$t('newGarment.image')"
      :placeholder="$t('newGarment.imageForTheGarment')"
      :drop-placeholder="$t('newGarment.imageForTheGarment')"
      @update="onInput"
      v-else
    )
</template>
<script>
import ImageBlobReduce from 'image-blob-reduce'
//import { errorToast } from '@/helpers/ui'
export default {
  data() {
    return {
      rawImage: null,
      resizing: false,
    }
  },
  methods: {
    async onInput(file) {
      try {
        this.resizing = true
        const reduce = new ImageBlobReduce()
        const blob = await reduce.toBlob(file, { max: 1024 })
        const newFile = new File([blob], file.name, { type: file.type })
        this.$emit('loaded', newFile)
      } catch (err) {
        //this.$bvToast.toast(`Error loading image`, errorToast)
      } finally {
        this.resizing = false
      }
    },
  },
}
</script>
