<template lang="pug">
section
    loading(v-if='loading')
    card-grid(v-else)
        garment-card(
            v-for='garment in garments' :key='garment.id'
            :id="garment.id"
            :name="garment.name"
            :washing="garment.washing"
            :thrown_away="garment.thrown_away"
            :image-path="garment.image"
        )
</template>

<script>
import GarmentCard from '@/components/GarmentCard.vue'
import { getThrownAwayGarments } from '@/apis/apis'
import { useToast } from 'vue-toastification'
export default {
  components: {
    garmentCard: GarmentCard,
  },
  data: function () {
    return {
      garments: [],
      loading: true,
    }
  },
  mounted: function () {
    this.loadList()
  },
  methods: {
    async loadList() {
      try {
        this.garments = await getThrownAwayGarments()
      } catch (err) {
        const toast = useToast()
        toast.error(`Garments can't be retrieved`)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
