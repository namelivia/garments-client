<template lang="pug">
div
    h1 {{ activity }}
    h1 {{ weather }}
    card-grid
        garment-card(
            v-for='garment in garments' :key='garment.id'
            :id="garment.id"
            :outfit-id="id"
            :name="garment.name"
            :image-path="garment.image"
            :can-reject="canRejectGarments"
            @rejected="onGarmentRejected"
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
    activity: {
      type: String,
      default: '',
    },
    canRejectGarments: {
      type: Boolean,
      default: true,
    },
    weather: {
      type: String,
      default: '',
    },
    garments: {
      //type: ,
      default: [],
    },
  },
  methods: {
    async onGarmentRejected(newOutfit) {
      this.$emit('rejected', newOutfit)
    },
  },
}
</script>
