<template lang="pug">
    b-card.mb-2.no-body(
        style="max-width: 20rem;"
    )
        b-card-img-lazy(:src="imageUrl" :alt="name" top ref="image")
        b-card-body(:title="name")
            router-link(:to="{ name: 'garment', params: { garmentId: id}}")
                b-button(v-t="'garmentCard.details'")
</template>
<script>
import { getImageUrl } from "@/apis/helpers";
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
  data: function () {
    return {
      imageWidth: 0,
    };
  },
  computed: {
    imageUrl: function () {
      if (this.imagePath && this.imageWidth) {
        return getImageUrl(this.imagePath, this.imageWidth);
      }
      return null;
    },
  },
  mounted: function () {
    this.calculateWidth();
  },
  methods: {
    calculateWidth() {
      this.imageWidth = this.$refs.image.$el.clientWidth;
    },
  },
};
</script>
