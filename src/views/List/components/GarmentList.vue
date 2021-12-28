<template lang="pug">
section
    loading(v-if='loading')
    card-grid(v-else)
        garment-card(
            v-for='garment in garments' :key='garment.id'
            :id="garment.id"
            :name="garment.name"
            :image-path="garment.image"
        )
</template>

<script>
import GarmentCard from '@/components/GarmentCard'
import { getGarments } from '@/apis/apis'
//import { errorToast } from '@/helpers/ui'
export default {
  components: {
    garmentCard: GarmentCard,
  },
  props: {
    place: {
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
      loading: true,
      selectedPlace: null,
      selectedType: null,
    }
  },
  watch: {
    place: function (newPlace) {
      this.selectedPlace = newPlace
      this.loadList()
    },
    garmentType: function (newType) {
      this.selectedType = newType
      this.loadList()
    },
  },
  methods: {
    async loadList() {
      if (!this.selectedType || !this.selectedType) {
        return null
      }
      try {
        this.garments = await getGarments(this.selectedPlace, this.selectedType)
      } catch (err) {
        //this.$bvToast.toast(`Garments can't be retrieved`, errorToast)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
