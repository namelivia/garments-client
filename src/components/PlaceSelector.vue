<template lang="pug">
loading(v-if='loading')
selector(
    id="place"
    :label="$t('newGarment.place')"
    :options="placeOptions"
    :initialValue="place"
    @selected="onChange"
    v-else
  )
</template>
<script>
import { getPlaces } from '@/apis/apis'
import { useToast } from 'vue-toastification'
export default {
  props: {
    selected: {
      type: String,
      default: '',
    },
  },
  emits: ['selected'],
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
        const toast = useToast()
        toast.error(`Places can't be retrieved`)
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
