<template lang="pug">
b-spinner(v-if="resizing" label="Loading...")
b-form-group(
    id="image-input-group"
    :label="$t('newGarment.image')"
    label-for="image"
    v-else
)
    b-form-file(
        id="image"
        name="image"
        v-model="rawImage"
        accept="image/*"
        :placeholder="$t('newGarment.imageForTheGarment')"
        :drop-placeholder="$t('newGarment.imageForTheGarment')"
        @input="onInput"
    )
</template>
<script>
import ImageBlobReduce from 'image-blob-reduce'
import { errorToast } from '@/helpers/ui'
export default {
  emits: ['loaded'],
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
        this.$bvToast.toast(`Error loading image`, errorToast)
      } finally {
        this.resizing = false
      }
    },
  },
}
</script>
