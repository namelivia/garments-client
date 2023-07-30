<template lang="pug">
section
    section-title(text="Add new place")
    form(@submit="onSubmit" @reset="onReset" v-if="show")
        text-input(
          :name="name"
          :label="$t('newPlace.name')"
          :placeholder="$t('newPlace.enterPlaceName')"
          :disabled="waiting"
          @update="form.name = $event"
          required
        )
        .mt-4
        submit-button.mr-2(:text="$t('newPlace.submit')" :disabled="waiting")
        reset-button(:text="$t('newPlace.reset')")
</template>

<script>
import router from '@/router'
import { postPlace } from '@/apis/apis'
import { useToast } from 'vue-toastification'
export default {
  data() {
    return {
      form: {
        name: '',
      },
      show: true,
      waiting: false,
    }
  },
  methods: {
    async onSubmit(evt) {
      const toast = useToast()
      try {
        this.waiting = true
        evt.preventDefault()
        await postPlace(this.form)
        toast.success(`Place ${this.form.name} created`)
        router.replace('/list')
      } catch (err) {
        toast.error(`Place could not be created`)
      } finally {
        this.waiting = false
      }
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
