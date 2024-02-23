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
    p.mb-0 {{$t("garmentDetails.activity")}}: {{ garment.activity}}
    p.mb-0 {{$t("garmentDetails.total_worn")}}: {{ garment.worn}}
    p.mb-0 {{$t("garmentDetails.worn")}}: {{ garment.total_worn}}
    p.mb-0 {{$t("garmentDetails.washing")}}: {{ garment.washing}}
    p.mb-0 {{$t("garmentDetails.thrown_away")}}: {{ garment.thrown_away}}
    regular-button.ml-2(name="send-to-wash" @click="onSendToWash" :text="$t('garmentDetails.sendToWash')" v-if="!garment.washing")
    danger-button(@click="onDelete" :text="$t('garmentDetails.deleteIt')")
    danger-button.ml-2(@click="onThrowAway" :text="$t('garmentDetails.throwAway')" v-if="!garment.thrown_away")
    router-link(:to="{ name: 'edit', params: { garmentId: this.garment.id}}")
        secondary-button.ml-2(:text="$t('garmentCard.editIt')")
</template>

<script>
import {
  getGarment,
  deleteGarment,
  sendToWashGarment,
  throwAwayGarment,
} from '@/apis/apis'
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
        await deleteGarment(this.garment.id)
        toast.success(`Garment removed`)
        router.replace('/list')
      } catch (err) {
        toast.error(`Garment could not be removed`)
      }
    },
    async onSendToWash(evt) {
      evt.preventDefault()
      const toast = useToast()
      try {
        await sendToWashGarment(this.garment.id)
        toast.success(`Garment ${this.garment.name} sent to wash`)
      } catch (err) {
        console.log(err)
        toast.error(`Garment could not be sent to wash`)
      }
    },
    async onThrowAway(evt) {
      const toast = useToast()
      evt.preventDefault()
      try {
        await throwAwayGarment(this.garment.id)
        toast.success(`Garment thrown away`)
        router.replace('/thrown_away')
      } catch (err) {
        toast.error(`Garment could not be thrown away`)
      }
    },
  },
}
</script>
