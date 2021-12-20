<template lang="pug">
section
    section-title(:text="$t('washing.title')")
    garment-list()
</template>

<script>
import GarmentList from './components/GarmentList'
export default {
  components: {
    GarmentList: GarmentList,
  },
}
</script>
