<template lang="pug">
section
    section-title(text="Add new garment")
    garment-form(@submit="onSubmit" :waiting="waiting")
</template>

<script>
import router from '@/router'
import GarmentForm from '@/components/GarmentForm.vue'
import { postGarment } from '@/apis/apis'
import { useToast } from 'vue-toastification'
export default {
  components: {
    GarmentForm,
  },
  data() {
    return {
      waiting: false,
    }
  },
  methods: {
    async onSubmit(data) {
      const toast = useToast()
      try {
        this.waiting = true
        await postGarment(data)
        toast.success(`Garment ${data.name} created`)
        router.replace('/list')
      } catch (err) {
        toast.error(`Garment could not be created`)
      } finally {
        this.waiting = false
      }
    },
  },
}
</script>
