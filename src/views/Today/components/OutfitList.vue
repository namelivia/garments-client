<template lang="pug">
section
    loading(v-if='loading')
    div(v-else)
        p(v-if='outfits.length === 0') {{ $t('outfit-list.no-outfits') }}
        card-grid(v-else)
            outfit-card(
                v-for='outfit in outfits' :key='outfit.id'
                :id="outfit.id"
                :activity="outfit.activity"
                :weather="outfit.weather"
                :garments="outfit.garments"
                :can-reject-garments="false"
            )
</template>

<script>
import OutfitCard from '@/components/OutfitCard.vue'
import { getTodaysOutfits } from '@/apis/apis'
import { useToast } from 'vue-toastification'
export default {
  components: {
    outfitCard: OutfitCard,
  },
  data: function () {
    return {
      outfits: [],
      loading: false,
    }
  },
  mounted: function () {
    this.loadList()
  },
  methods: {
    async loadList() {
      this.loading = true
      try {
        this.outfits = await getTodaysOutfits()
      } catch (err) {
        const toast = useToast()
        toast.error(`Outfits can't be retrieved`)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
