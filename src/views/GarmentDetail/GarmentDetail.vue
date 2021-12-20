<template lang="pug">
section
    loading(v-if='loading')
    div(v-else)
        garment-card-big(:garment-id="garmentId")
        journal(:garment-id="garmentId")
</template>

<script>
import Journal from '@/components/Journal'
import GarmentCardBig from './components/GarmentCardBig'
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
