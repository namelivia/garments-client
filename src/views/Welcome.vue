<template lang="pug">
section
    section-title(:text="$t('welcome.welcome')")
    place-selector(@selected="onPlaceSelected" :selected="form.place")
    span {{ this.weather }}
    activity-selector(@selected="onActivitySelected" :selected="form.activity")
    regular-button(
        v-if="outfit !== null"
        name="wear-outfit"
        @click="onWear"
        :text="$t('welcome.wear')"
    )
    outfit-card(
        v-if="outfit !== null"
        :id="outfit.id"
        :activity="outfit.activity"
        :weather="outfit.weather"
        :garments="outfit.garments"
        @rejected="onGarmentRejected"
    )
</template>

<script>
import OutfitCard from '@/components/OutfitCard.vue'
import PlaceSelector from '@/components/PlaceSelector.vue'
import ActivitySelector from '@/components/ActivitySelector.vue'
import { getOutfit, getWeatherForPlace, wearOutfit } from '@/apis/apis'
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
      weather: null,
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
      this.getWeatherForCurrentPlace()
      this.getOutfit()
    },
    onActivitySelected(selectedActivity) {
      this.form.activity = selectedActivity
      this.getOutfit()
    },
    async onWear(evt) {
      const toast = useToast()
      evt.preventDefault()
      try {
        const response = await wearOutfit(this.outfit.id)
        toast.success(`Wearing outfit`)
      } catch (err) {
        console.log(err)
        toast.error(`Error wearing outfit`)
      }
    },
    async onGarmentRejected(newOutfit) {
      this.outfit = newOutfit
    },
    async getWeatherForCurrentPlace() {
      try {
        if (this.form.place === null) {
          return null
        }
        this.weather = await getWeatherForPlace(this.form.place)
      } catch (err) {
        console.log(err)
        const toast = useToast()
        toast.error(`Weather can't be retrieved`)
      }
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
