<template lang="pug">
b-spinner(v-if="loading" label="Loading...")
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
import { getJournal } from "@/apis/apis";
import { errorToast } from "@/helpers/ui";
import JournalEntry from "./JournalEntry";
import AddJournalEntry from "./AddJournalEntry";
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
    };
  },
  watch: {
    garmentId: {
      immediate: true,
      handler: function (newData) {
        this.id = newData;
        this.loadJournal();
      },
    },
  },
  methods: {
    async loadJournal() {
      try {
        this.journal = await getJournal(this.id);
      } catch (err) {
        this.$bvToast.toast(`Journal can't be retrieved`, errorToast);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
