<template lang="pug">
section
    section-title(text="Weather")
    range-view(:ranges="ranges")
</template>

<script>
import Weather from '@/views/Rules/components/Weather.vue'
import { getWeatherConfiguration } from '@/apis/apis'
import { useToast } from 'vue-toastification'
export default {
  components: {
    Weather: Weather,
  },
  data() {
    return {
      show: true,
      waiting: false,
      ranges: [],
    }
  },
  mounted() {
    this.getWeatherConfiguration()
  },
  methods: {
    async getWeatherConfiguration() {
      try {
        const configuration = await getWeatherConfiguration()
        this.ranges = configuration.map((c) => {
          return {
            label: c.name,
            max: c.max,
          }
        })
      } catch (err) {
        console.log(err)
        toast.error(`Error getting configuration`)
      }
    },
  },
}
</script>
