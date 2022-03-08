<template lang="pug">
loading(v-if='loading')
section(v-else)
    .mt-4
    journal-entry(
      v-for='entry in journal' :key='entry.id'
        :message="entry.message"
        :timestamp="entry.timestamp"
      )
    add-journal-entry.mt-4(:garment-id="this.id")
</template>
<script>
import { getJournal } from '@/apis/apis'
import { useToast } from 'vue-toastification'
import JournalEntry from '@/components/JournalEntry.vue'
import AddJournalEntry from '@/components/AddJournalEntry.vue'
export default {
  components: {
    JournalEntry,
    AddJournalEntry,
  },
  props: {
    garmentId: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      journal: [],
      id: null,
      loading: true,
    }
  },
  watch: {
    garmentId: {
      immediate: true,
      handler: function (newData) {
        this.id = newData
        this.loadJournal()
      },
    },
  },
  methods: {
    async loadJournal() {
      const toast = useToast()
      try {
        this.journal = await getJournal(this.id)
      } catch (err) {
        toast.error(`Journal can't be retrieved`)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
