<template lang="pug">
section
    h1 Edit existing garment
    garment-form(@submit="onSubmit" :initial-data="form")
</template>

<script>
import router from '@/router'
import { getGarment, putGarment } from '@/apis/apis'
import { useToast } from 'vue-toastification'
import GarmentForm from '@/components/GarmentForm.vue'
export default {
  components: {
    GarmentForm,
  },
  props: {
    garmentId: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      form: {
        name: '',
        garment_type: '',
        status: '',
        color: '',
        place: '',
        activity: '',
        wear_to_wash: 1,
        image: null,
      },
      show: true,
    }
  },
  mounted: function () {
    this.loadGarment()
  },
  methods: {
    async loadGarment() {
      const toast = useToast()
      try {
        const garment = await getGarment(this.garmentId)
        //TODO: I can't do this using the spread operator
        this.form.name = garment.name
        this.form.garment_type = garment.garment_type
        this.form.color = garment.color
        this.form.status = garment.status
        this.form.place = garment.place
        this.form.activity = garment.activity
        this.form.wear_to_wash = garment.wear_to_wash
        this.form.image = garment.image
      } catch (err) {
        toast.error(`Garment can't be retrieved`)
      } finally {
        this.loading = false
      }
    },
    async onSubmit(data) {
      const toast = useToast()
      try {
        await putGarment(this.garmentId, data)
        toast.success(`Garment ${data.name} updated`)
        router.replace('/list')
      } catch (err) {
        console.log(err)
        toast.error(`Garment could not be updated`)
      }
    },
  },
}
</script>
