<template lang="pug">
div
  h1.text-center.text-1xl.leading-relaxed Loading...
  .flex.items-center.justify-center.space-x-2.animate-bounce
    .w-8.h-8.bg-blue-400.rounded-full
    .w-8.h-8.bg-green-400.rounded-full
    .w-8.h-8.bg-red-400.rounded-full
</template>

<script lang="ts">
export default {
  props: {
    text: String,
  },
}
</script>
