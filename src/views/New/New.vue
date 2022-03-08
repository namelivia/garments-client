<template lang="pug">
section
    section-title(text="Add new garment")
    garment-form(@submit="onSubmit")
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
  methods: {
    async onSubmit(data) {
      const toast = useToast()
      try {
        await postGarment(data)
        router.replace('/list', () => {
          toast.success(`Garment ${data.name} created`)
        })
      } catch (err) {
        toast.error(`Garment could not be created`)
      }
    },
  },
}
</script>
