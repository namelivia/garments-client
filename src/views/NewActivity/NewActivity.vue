<template lang="pug">
section
    section-title(text="Add new activity")
    form(@submit="onSubmit" @reset="onReset" v-if="show")
        text-input(
          :name="name"
          :label="$t('newActivity.name')"
          :activityholder="$t('newActivity.enterActivityName')"
          @update="form.name = $event"
          required
        )
        .mt-4
        submit-button.mr-2(:text="$t('newActivity.submit')")
        reset-button(:text="$t('newActivity.reset')")
</template>

<script>
import router from '@/router'
import { postActivity } from '@/apis/apis'
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
        await postActivity(this.form)
        toast.success(`Activity ${this.form.name} created`)
        router.replace('/list')
      } catch (err) {
        toast.error(`Activity could not be created`)
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
