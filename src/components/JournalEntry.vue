<template lang="pug">
card
  p.mb-0 {{formattedDate}}
  p.mb-0 {{message}}
</template>
<script>
export default {
  props: {
    message: {
      type: String,
      default: '',
    },
    timestamp: {
      type: String,
      default: '',
    },
  },
  computed: {
    formattedDate: function () {
      return new Date(this.timestamp).toLocaleString()
    },
  },
}
</script>
