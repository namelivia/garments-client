<template lang="pug">
section
    section-title(text="Add new garment type")
    b-form(@submit="onSubmit" @reset="onReset"  v-if="show")
        b-form-group(
            id="name-input-group"
            :label="$t('newGarmentType.name')"
            label-for="name"
        )
            b-form-input(
                id="name"
                name="name"
                v-model="form.name"
                type="text"
                required
                :garment_typeholder="$t('newGarmentType.enterGarmentTypeName')"
            )
        .mt-4
        b-button.mr-2(type="submit" variant="primary") {{$t('newGarmentType.submit')}}
        b-button(type="reset" variant="danger") {{$t('newGarmentType.reset')}}
</template>

<script>
import router from '@/router'
import { postGarmentType } from '@/apis/apis'
import { errorToast, okToast } from '@/helpers/ui'
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
        await postGarmentType(this.form)
        router.replace('/list', () => {
          this.$root.$bvToast.toast(
            `GarmentType ${this.form.name} created`,
            okToast,
          )
        })
      } catch (err) {
        this.$bvToast.toast(`GarmentType could not be created`, errorToast)
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
