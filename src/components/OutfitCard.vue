<template lang="pug">
div
    card-grid
        garment-card(
            v-for='garment in garments' :key='garment.id'
            :id="garment.id"
            :outfit-id="id"
            :name="garment.name"
            :image-path="garment.image"
        )
</template>
<script>
import OutfitGarmentCard from '@/components/OutfitGarmentCard.vue'
import { getImageUrl } from '@/apis/helpers'
import { useToast } from 'vue-toastification'
export default {
  components: {
    garmentCard: OutfitGarmentCard,
  },
  props: {
    id: {
      type: Number,
      default: 0,
    },
    garments: {
      //type: ,
      default: [],
    },
  },
}
</script>
