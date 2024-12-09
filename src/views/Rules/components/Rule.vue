<template lang="pug">
    li {{ rule.weather }} -> {{ rule.garment_type.name }} -> {{ rule.activity.name }}
</template>
<script>
export default {
  props: {
    rule: {
      type: Object,
      default: () => {},
    },
  },
}
</script>
