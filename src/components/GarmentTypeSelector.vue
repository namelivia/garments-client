<template lang="pug">
loading(v-if='loading')
selector(
    id="garment_type"
    :label="$t('newGarment.garment_type')"
    :options="garmentTypeOptions"
    :initialValue="garmentType"
    @selected="onChange"
    v-else
  )
</template>
<script>
import { getGarmentTypes } from '@/apis/apis'
import { useToast } from 'vue-toastification'
export default {
  props: {
    selected: {
      type: String,
      default: '',
    },
  },
  emits: ['selected'],
  data() {
    return {
      garmentTypes: [],
      garmentType: '',
      loading: true,
    }
  },
  computed: {
    garmentTypeOptions: function () {
      let options = [{ value: '', text: 'Select a type', disabled: true }]
      return options.concat(
        this.garmentTypes.map((garmentType) => {
          return {
            value: garmentType.name,
            text: garmentType.name,
          }
        }),
      )
    },
  },
  watch: {
    selected: {
      immediate: true,
      handler: function (newData) {
        this.garmentType = newData
      },
    },
  },
  mounted: function () {
    this.loadGarmentTypes()
  },
  methods: {
    async loadGarmentTypes() {
      try {
        this.garmentTypes = await getGarmentTypes()
      } catch (err) {
        const toast = useToast()
        toast.error(`Garment Types can't be retrieved`)
      } finally {
        this.loading = false
      }
    },
    onChange(selected) {
      this.$emit('selected', selected)
    },
  },
}
</script>
