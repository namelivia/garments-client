<template lang="pug">
section
    loading(v-if='loading')
    div(v-else)
        garment-card-big(:garment-id="garmentId")
        journal(:garment-id="garmentId")
</template>

<script>
import Journal from '@/components/Journal.vue'
import GarmentCardBig from '@/views/GarmentDetail/components/GarmentCardBig.vue'
export default {
  components: {
    Journal,
    GarmentCardBig,
  },
  props: {
    garmentId: {
      type: Number,
      default: 0,
    },
  },
}
</script>
