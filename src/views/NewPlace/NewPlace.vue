<template lang="pug">
section
    section-title(text="Add new place")
    form(@submit="onSubmit" @reset="onReset" v-if="show")
        text-input(
          :name="name"
          :label="$t('newPlace.name')"
          :placeholder="$t('newPlace.enterPlaceName')"
          @update="form.name = $event"
          required
        )
        .mt-4
        submit-button.mr-2(:text="$t('newPlace.submit')")
        reset-button(:text="$t('newPlace.reset')")
</template>

<script>
import router from '@/router'
import { postPlace } from '@/apis/apis'
//import { errorToast, okToast } from '@/helpers/ui'
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
      try {
        evt.preventDefault()
        await postPlace(this.form)
        router.replace('/list', () => {
          //this.$root.$bvToast.toast(`Place ${this.form.name} created`, okToast)
        })
      } catch (err) {
        //this.$bvToast.toast(`Place could not be created`, errorToast)
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
