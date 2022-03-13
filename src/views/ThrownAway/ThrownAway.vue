<template lang="pug">
section
    section-title(:text="$t('thrown_away.title')")
    garment-list()
</template>

<script>
import GarmentList from '@/views/ThrownAway/components/GarmentList.vue'
export default {
  components: {
    GarmentList: GarmentList,
  },
}
</script>
