<template lang="pug">
section
    section-title(:text="$t('today.title')")
    outfit-list()
</template>

<script>
import OutfitList from '@/views/Today/components/OutfitList.vue'
export default {
  components: {
    OutfitList: OutfitList,
  },
}
</script>
