<template lang="pug">
loading(v-if='loading')
selector(
    id="activity"
    :label="$t('newGarment.activity')"
    :options="activityOptions"
    @selected="onChange"
    v-else
  )
</template>
<script>
import { getActivities } from '@/apis/apis'
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
      activities: [],
      activity: '',
      loading: true,
    }
  },
  computed: {
    activityOptions: function () {
      let options = [{ value: '', text: 'Select a activity', disabled: true }]
      return options.concat(
        this.activities.map((activity) => {
          return {
            value: activity.name,
            text: activity.name,
          }
        }),
      )
    },
  },
  watch: {
    selected: {
      immediate: true,
      handler: function (newData) {
        this.activity = newData
      },
    },
  },
  mounted: function () {
    this.loadActivities()
  },
  methods: {
    async loadActivities() {
      try {
        this.activities = await getActivities()
      } catch (err) {
        const toast = useToast()
        toast.error(`Activities can't be retrieved`)
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
