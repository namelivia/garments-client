<template lang="pug">
    li {{ rule.weather }} -> {{ rule.activity.name }} -> {{ rule.garment_type.name }}
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
