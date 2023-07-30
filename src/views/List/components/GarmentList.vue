<template lang="pug">
section
    loading(v-if='loading')
    card-grid(v-else)
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
import { getGarments } from '@/apis/apis'
import { useToast } from 'vue-toastification'
export default {
  components: {
    garmentCard: GarmentCard,
  },
  props: {
    place: {
      type: String,
      default: null,
    },
    activity: {
      type: String,
      default: null,
    },
    garmentType: {
      type: String,
      default: null,
    },
  },
  data: function () {
    return {
      garments: [],
      loading: false,
      selectedPlace: null,
      selectedActivity: null,
      selectedType: null,
    }
  },
  watch: {
    place: function (newPlace) {
      this.selectedPlace = newPlace
      this.loadList()
    },
    activity: function (newActivity) {
      this.selectedActivity = newActivity
      this.loadList()
    },
    garmentType: function (newType) {
      this.selectedType = newType
      this.loadList()
    },
  },
  methods: {
    async loadList() {
      this.loading = true
      if (!this.selectedType || !this.selectedActivity || !this.selectedPlace) {
        return null
      }
      try {
        this.garments = await getGarments(
          this.selectedPlace,
          this.selectedType,
          this.selectedActivity,
        )
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
