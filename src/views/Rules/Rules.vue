<template lang="pug">
section
    section-title(text="Rules")
    span {{ this.rules}}
</template>

<script>
import { getRules } from '@/apis/apis'
import { useToast } from 'vue-toastification'
export default {
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
