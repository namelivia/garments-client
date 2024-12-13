<template lang="pug">
section
    section-title(text="Rules")
    ul
        weather(v-for="(rules, weather) in rules" :key="weather" :weather="weather" :rules="rules")
</template>

<script>
import Weather from '@/views/Rules/components/Weather.vue'
import { getRules } from '@/apis/apis'
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
    }
  },
  mounted() {
    this.getRulesList()
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
  },
}
</script>
