<template lang="pug">
section
    section-title(text="Weather")
    p(v-if="ranges.length === 0") No weather rules found
    range-view(v-else :ranges="ranges")
section
    section-title(text="Rules")
    ul
        weather(v-for="(rules, weather) in rules" :key="weather" :weather="weather" :rules="rules")
</template>

<script>
import Weather from '@/views/Rules/components/Weather.vue'
import { getRules, getWeatherConfiguration } from '@/apis/apis'
import { useToast } from 'vue-toastification'
export default {
  components: {
    Weather: Weather,
  },
  data() {
    return {
      rules: {},
      show: true,
      waiting: false,
      ranges: [],
    }
  },
  mounted() {
    this.getRulesList()
    this.getWeatherConfiguration()
  },
  methods: {
    async getRulesList() {
      try {
        const rules = await getRules()
        const groupedRules = rules.reduce((acc, rule) => {
          if (!acc[rule.weather]) {
            acc[rule.weather] = []
          }
          acc[rule.weather].push(rule)
          return acc
        }, {})
        this.rules = groupedRules
      } catch (err) {
        console.log(err)
        toast.error(`Error getting rules`)
      }
    },
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
