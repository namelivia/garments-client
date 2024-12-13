<template lang="pug">
    span {{ weather }}
    ul.ml-4
        li(v-for="(rules, activity_name) in groupedRules" :key="activity_name")
            span {{ activity_name }}
            ul.ml-4
                li(v-for="rule in rules" :key="rule.id")
                    span {{ rule.garment_type.name }}
</template>
<script>
export default {
  props: {
    weather: {
      type: String,
    },
    rules: {
      type: Array,
    },
  },
  computed: {
    groupedRules: function () {
      return this.rules.reduce((acc, rule) => {
        if (!acc[rule.activity.name]) {
          acc[rule.activity.name] = []
        }
        acc[rule.activity.name].push(rule)
        return acc
      }, {})
    },
  },
}
</script>
