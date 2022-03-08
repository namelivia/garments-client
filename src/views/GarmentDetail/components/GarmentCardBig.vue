<template lang="pug">
loading(v-if='loading')
section(v-else)
    img.mb-4.img-fluid(:src="imageUrl")
    p.mb-0 Id: {{ garment.id}}
    p.mb-0 {{$t("garmentDetails.name")}}: {{ garment.name }}
    p.mb-0 {{$t("garmentDetails.garment_type")}}: {{ garment.garment_type}}
    p.mb-0 {{$t("garmentDetails.color")}}: {{ garment.color}}
    p.mb-0 {{$t("garmentDetails.status")}}: {{ garment.status}}
    p.mb-0 {{$t("garmentDetails.place")}}: {{ garment.place}}
    danger-button(@click="onDelete" :text="$t('garmentDetails.deleteIt')")
    router-link(:to="{ name: 'edit', params: { garmentId: this.garment.id}}")
        secondary-button.ml-2(:text="$t('garmentCard.editIt')")
</template>

<script>
import { getGarment, deleteGarment } from '@/apis/apis'
import { getImageUrl } from '@/apis/helpers'
import { useToast } from 'vue-toastification'
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
      const toast = useToast()
      try {
        this.garment = await getGarment(garmentId)
      } catch (err) {
        toast.error(`Garment can't be retrieved`)
      } finally {
        this.loading = false
      }
    },
    async onDelete(evt) {
      const toast = useToast()
      evt.preventDefault()
      try {
        deleteGarment(this.garment.id)
        router.replace('/list', () => {
          toast.success(`Garment removed`)
        })
      } catch (err) {
        toast.error(`Garment could not be removed`)
      }
    },
  },
}
</script>
