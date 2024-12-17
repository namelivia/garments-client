<template lang="pug">
section
    section-title(text="Weather")
    span {{ configuration }}
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
      configuration: {},
      show: true,
      waiting: false,
    }
  },
  mounted() {
    this.getWeatherConfiguration()
  },
  methods: {
    async getWeatherConfiguration() {
      try {
        const configuration = await getWeatherConfiguration()
        this.configuration = configuration
      } catch (err) {
        console.log(err)
        toast.error(`Error getting configuration`)
      }
    },
  },
}
</script>
