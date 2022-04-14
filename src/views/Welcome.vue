<template lang="pug">
section
    section-title(:text="$t('welcome.welcome')")
    place-selector(@selected="onPlaceSelected" :selected="form.place")
    activity-selector(@selected="onActivitySelected" :selected="form.activity")
    garment-type-selector(@selected="onGarmentTypeSelected")
    garment-card(
        v-if="randomGarment !== null"
        :id="randomGarment.id"
        :name="randomGarment.name"
        :image-path="randomGarment.image"
    )
</template>

<script>
import GarmentCard from '@/components/GarmentCard.vue'
import GarmentTypeSelector from '@/components/GarmentTypeSelector.vue'
import PlaceSelector from '@/components/PlaceSelector.vue'
import ActivitySelector from '@/components/ActivitySelector.vue'
import { getRandomGarment } from '@/apis/apis'
import { useToast } from 'vue-toastification'
import { store } from '@namelivia/vue-currentuser'
export default {
  components: {
    garmentCard: GarmentCard,
    GarmentTypeSelector: GarmentTypeSelector,
    PlaceSelector: PlaceSelector,
    ActivitySelector: ActivitySelector,
  },
  data: function () {
    return {
      randomGarment: null,
      form: {
        garment_type: null,
        place: null,
        activity: null,
        image: null,
      },
      loading: true,
    }
  },
  mounted() {
    this.getCurrentUser()
  },
  methods: {
    async getCurrentUser() {
      const currentUser = await store.getCurrentUser(
        import.meta.env.VITE_APP_API_ENDPOINT,
      )
      this.form.place = currentUser.place || ''
    },
    onGarmentTypeSelected(selectedGarmentType) {
      this.form.garment_type = selectedGarmentType
      this.loadRandom()
    },
    onPlaceSelected(selectedPlace) {
      this.form.place = selectedPlace
      this.loadRandom()
    },
    onActivitySelected(selectedActivity) {
      this.form.activity = selectedActivity
      this.loadRandom()
    },
    async loadRandom() {
      try {
        this.randomGarment = await getRandomGarment(
          this.form.place,
          this.form.garment_type,
          this.form.activity,
          this.form.image,
        )
      } catch (err) {
        const toast = useToast()
        toast.error(`Random can't be retrieved`)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
