<template lang="pug">
section
    section-title(:text="$t('list.title')")
    div.flex
        garment-type-selector(@selected="onGarmentTypeSelected")
        place-selector(@selected="onPlaceSelected" :selected="form.place")
        activity-selector(@selected="onActivitySelected" :selected="form.activity")
    garment-list(
        :place="form.place"
        :activity="form.activity"
        :garment-type="form.garment_type"
    )
</template>

<script>
import GarmentList from '@/views/List/components/GarmentList.vue'
import GarmentTypeSelector from '@/components/GarmentTypeSelector.vue'
import PlaceSelector from '@/components/PlaceSelector.vue'
import ActivitySelector from '@/components/ActivitySelector.vue'
import { store } from '@namelivia/vue-currentuser'
export default {
  components: {
    GarmentList: GarmentList,
    GarmentTypeSelector: GarmentTypeSelector,
    PlaceSelector: PlaceSelector,
    ActivitySelector: ActivitySelector,
  },
  data: function () {
    return {
      form: {
        garment_type: '',
        place: '',
      },
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
    },
    onPlaceSelected(selectedPlace) {
      this.form.place = selectedPlace
    },
    onActivitySelected(selectedActivity) {
      this.form.activity = selectedActivity
    },
  },
}
</script>
