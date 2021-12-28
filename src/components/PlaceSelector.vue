<template lang="pug">
    loading(v-if='loading')
    selector(
        id="place"
        :label="$t('newPlace.place')"
        :options="placeOptions"
        @selected="onChange"
        v-else
      )
</template>
<script>
import { getPlaces } from '@/apis/apis'
//import { errorToast } from '@/helpers/ui'
export default {
  props: {
    selected: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      places: [],
      place: '',
      loading: true,
    }
  },
  computed: {
    placeOptions: function () {
      let options = [{ value: '', text: 'Select a place', disabled: true }]
      return options.concat(
        this.places.map((place) => {
          return {
            value: place.name,
            text: place.name,
          }
        }),
      )
    },
  },
  watch: {
    selected: {
      immediate: true,
      handler: function (newData) {
        this.place = newData
      },
    },
  },
  mounted: function () {
    this.loadPlaces()
  },
  methods: {
    async loadPlaces() {
      try {
        this.places = await getPlaces()
      } catch (err) {
        //this.$bvToast.toast(`Places can't be retrieved`, errorToast)
      } finally {
        this.loading = false
      }
    },
    onChange(selected) {
      this.$emit('selected', selected)
    },
  },
}
</script>
