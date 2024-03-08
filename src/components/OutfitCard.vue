<template lang="pug">
div
    card-grid
        garment-card(
            v-for='garment in garments' :key='garment.id'
            :id="garment.id"
            :name="garment.name"
            :washing="garment.washing"
            :image-path="garment.image"
        )
</template>
<script>
import GarmentCard from '@/components/GarmentCard.vue'
import { getImageUrl } from '@/apis/helpers'
import { useToast } from 'vue-toastification'
export default {
  components: {
    garmentCard: GarmentCard,
  },
  props: {
    garments: {
      //type: ,
      default: [],
    },
  },
}
</script>
