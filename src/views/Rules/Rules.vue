<template lang="pug">
section
    section-title(text="Rules")
    ul
        rule(v-for="rule in rules" :rule="rule")
</template>

<script>
import Rule from '@/views/Rules/components/Rule.vue'
import { getRules } from '@/apis/apis'
import { useToast } from 'vue-toastification'
export default {
  components: {
    Rule: Rule,
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
        this.rules = await getRules()
      } catch (err) {
        console.log(err)
        toast.error(`Error getting rules`)
      }
    },
  },
}
</script>
