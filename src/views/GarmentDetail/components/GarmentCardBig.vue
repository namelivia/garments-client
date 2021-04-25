<template lang="pug">
b-spinner(v-if="loading" label="Loading...")
section(v-else)
    img.mb-4.img-fluid(:src="imageUrl")
    p.mb-0 Id: {{ garment.id}}
    p.mb-0 {{$t("garmentDetails.name")}}: {{ garment.name }}
    p.mb-0 {{$t("garmentDetails.garment_type")}}: {{ garment.garment_type}}
    p.mb-0 {{$t("garmentDetails.color")}}: {{ garment.color}}
    p.mb-0 {{$t("garmentDetails.status")}}: {{ garment.status}}
    p.mb-0 {{$t("garmentDetails.place")}}: {{ garment.place}}
    b-button(variant="danger" v-on:click="onDelete" v-t="'garmentDetails.deleteIt'")
    router-link(:to="{ name: 'edit', params: { garmentId: this.garment.id}}")
        b-button.ml-2(v-t="'garmentCard.editIt'")
</template>

<script>
import { getGarment, deleteGarment } from '@/apis/apis'
import { getImageUrl } from '@/apis/helpers'
import { errorToast, okToast } from '@/helpers/ui'
import router from '@/router'
export default {
  props: {
    garmentId: {
      type: Number,
      default: 0,
    },
  },
  data: function () {
    return {
      garment: null,
      loading: true,
    }
  },
  computed: {
    imageUrl: function () {
      if (this.garment.image) {
        return getImageUrl(this.garment.image)
      }
      return null
    },
  },
  watch: {
    garmentId: {
      immediate: true,
      handler: function (newData) {
        this.loadGarment(newData)
      },
    },
  },
  methods: {
    async loadGarment(garmentId) {
      try {
        this.garment = await getGarment(garmentId)
      } catch (err) {
        this.$bvToast.toast(`Garment can't be retrieved`, errorToast)
      } finally {
        this.loading = false
      }
    },
    async onDelete(evt) {
      evt.preventDefault()
      try {
        deleteGarment(this.garment.id)
        router.replace('/list', () => {
          this.$root.$bvToast.toast(`Garment removed`, okToast)
        })
      } catch (err) {
        this.$bvToast.toast(`Garment could not be removed`, errorToast)
      }
    },
  },
}
</script>
