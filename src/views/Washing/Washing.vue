<template lang="pug">
section
    section-title(:text="$t('washing.title')")
    garment-list()
</template>

<script>
import GarmentList from '@/views/Washing/components/GarmentList.vue'
export default {
  components: {
    GarmentList: GarmentList,
  },
}
</script>
