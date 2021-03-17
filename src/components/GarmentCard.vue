<template lang="pug">
    b-card.mb-2.no-body(
        style="max-width: 20rem;"
    )
        b-card-img-lazy(:src="imageUrl" :alt="name" top ref="image")
        b-card-body(:title="name")
            b-button(variant="primary" size="lg" v-on:click="onWear" v-t="'garmentCard.wearIt'")
            router-link(:to="{ name: 'garment', params: { garmentId: id}}")
                b-button(v-t="'garmentCard.details'")
</template>
<script>
import { getImageUrl } from "@/apis/helpers";
import { wearGarment } from "@/apis/apis";
import { errorToast, okToast } from "@/helpers/ui";
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
    async onWear(evt) {
      evt.preventDefault();
      try {
        await wearGarment(this.id);
        this.$bvToast.toast(`Wearing Garment ${this.name}`, okToast);
      } catch (err) {
        console.log(err);
        this.$bvToast.toast(`Garment could not be worn`, errorToast);
      }
    },
    calculateWidth() {
      this.imageWidth = this.$refs.image.$el.clientWidth;
    },
  },
};
</script>
