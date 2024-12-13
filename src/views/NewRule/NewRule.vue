<template lang="pug">
section
    section-title(text="Add rule")
    form(@submit="onSubmit" @reset="onReset" v-if="show")
        garment-type-selector(@selected="onGarmentTypeSelected" :selected="form.garment_type" :disabled="waiting")
        place-selector(@selected="onPlaceSelected" :selected="form.place" :disabled="waiting")
        activity-selector(@selected="onActivitySelected" :selected="form.activity" :disabled="waiting")
        text-input(
          :weather="weather"
          :label="$t('newRule.weather')"
          :placeholder="$t('newRule.enterWeather')"
          :disabled="waiting"
          @update="form.weather = $event"
          required
        )
        .mt-4
        submit-button.mr-2(:text="$t('newRule.submit')" :disabled="waiting")
        reset-button(:text="$t('newRule.reset')")
</template>

<script>
import router from '@/router'
import GarmentTypeSelector from '@/components/GarmentTypeSelector.vue'
import ActivitySelector from '@/components/ActivitySelector.vue'
import { postRule } from '@/apis/apis'
import { useToast } from 'vue-toastification'
export default {
  components: {
    GarmentTypeSelector,
    ActivitySelector,
  },
  data() {
    return {
      form: {
        activity: '',
        garment_type: '',
        weather: '',
      },
      show: true,
      waiting: false,
    }
  },
  methods: {
    onGarmentTypeSelected(selectedGarmentType) {
      this.form.garment_type = selectedGarmentType
    },
    onActivitySelected(selectedActivity) {
      this.form.activity = selectedActivity
    },
    async onSubmit(evt) {
      const toast = useToast()
      try {
        this.waiting = true
        evt.preventDefault()
        await postRule(this.form)
        toast.success(`Rule created`)
        router.replace('/rules')
      } catch (err) {
        toast.error(`Rule could not be created`)
      } finally {
        this.waiting = false
      }
    },
    onInput(value) {
      this.form.name = value
    },
    onReset(evt) {
      if (evt) {
        evt.preventDefault()
      }
      this.form.activity = ''
      this.form.garment_type = ''
      this.form.weather = ''
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
  },
}
</script>
