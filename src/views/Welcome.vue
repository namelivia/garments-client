<template lang="pug">
section
    section-title(:text="$t('welcome.welcome')")
    place-selector(@selected="onPlaceSelected" :selected="form.place")
    activity-selector(@selected="onActivitySelected" :selected="form.activity")
    outfit-card(
        v-if="outfit !== null"
        :garments="outfit.garments"
    )
</template>

<script>
import OutfitCard from '@/components/OutfitCard.vue'
import PlaceSelector from '@/components/PlaceSelector.vue'
import ActivitySelector from '@/components/ActivitySelector.vue'
import { getOutfit } from '@/apis/apis'
import { useToast } from 'vue-toastification'
import { store } from '@namelivia/vue-currentuser'
export default {
  components: {
    outfitCard: OutfitCard,
    PlaceSelector: PlaceSelector,
    ActivitySelector: ActivitySelector,
  },
  data: function () {
    return {
      outfit: null,
      form: {
        place: null,
        activity: null,
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
      this.form.place = currentUser.place || null
    },
    onPlaceSelected(selectedPlace) {
      this.form.place = selectedPlace
      this.getOutfit()
    },
    onActivitySelected(selectedActivity) {
      this.form.activity = selectedActivity
      this.getOutfit()
    },
    async getOutfit() {
      try {
        if (this.form.place === null || this.form.activity === null) {
          return null
        }
        this.outfit = await getOutfit(this.form.place, this.form.activity)
      } catch (err) {
        const toast = useToast()
        toast.error(`Outfit can't be retrieved`)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
