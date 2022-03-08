<template lang="pug">
section
    section-title(text="Add new garment type")
    form(@submit="onSubmit" @reset="onReset" v-if="show")
        text-input(
          :name="name"
          :label="$t('newGarmentType.name')"
          :placeholder="$t('newGarmentType.enterGarmentTypeName')"
          @update="onInput"
          required
        )
        .mt-4
        submit-button.mr-2(:text="$t('newGarmentType.submit')")
        reset-button(:text="$t('newGarmentType.reset')")
</template>

<script>
import router from '@/router'
import { postGarmentType } from '@/apis/apis'
import { useToast } from 'vue-toastification'
export default {
  data() {
    return {
      form: {
        name: '',
      },
      show: true,
    }
  },
  methods: {
    async onSubmit(evt) {
      const toast = useToast()
      try {
        evt.preventDefault()
        await postGarmentType(this.form)
        toast.success(`GarmentType ${this.form.name} created`)
        router.replace('/list')
      } catch (err) {
        toast.error(`GarmentType could not be created`)
      }
    },
    onInput(value) {
      this.form.name = value
    },
    onReset(evt) {
      if (evt) {
        evt.preventDefault()
      }
      this.form.name = ''
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
  },
}
</script>
