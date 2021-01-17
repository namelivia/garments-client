<template lang="pug">
    b-card.mb-2(
        :title="name"
        :img-src="imageUrl"
        :img-alt="name"
        img-top
        style="max-width: 20rem;"
    )
        router-link(:to="{ name: 'garment', params: { garmentId: id}}")
            b-button.ml-2(v-t="'garmentCard.details'")
</template>
<script>
export default {
  props: {
    name: {
      type: String,
      default: "",
    },
    id: {
      type: Number,
      default: 0,
    },
    imagePath: {
      type: String,
      default: "@/assets/images/image-placeholder.png",
    },
  },
  computed: {
    imageUrl: function () {
      if (this.imagePath) {
        return process.env.VUE_APP_API_ENDPOINT + this.imagePath;
      }
      return null;
    },
  },
};
</script>
