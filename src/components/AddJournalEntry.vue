<template lang="pug">
section
    form(@submit="onSubmit" @reset="onReset"  v-if="show")
        text-input(
          id="message"
          :label="$t('addJournalEntry.insertEntryManually')"
          :placeholder="$t('addJournalEntry.messageContent')"
          :disabled="waiting"
          @update="form.message = $event"
          required
        )
        submit-button(:text="$t('addJournalEntry.add')" :disabled="waiting")
</template>
<script>
import { postJournalEntry } from '@/apis/apis'
import { useToast } from 'vue-toastification'
export default {
  props: {
    garmentId: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      form: {
        message: '',
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
        await postJournalEntry(this.garmentId, this.form)
        toast.success(`Journal entry added`)
        this.onReset()
      } catch (err) {
        toast.error(`Journal entry could not be added`)
      } finally {
        this.waiting = false
      }
    },
    onReset(evt) {
      if (evt) {
        evt.preventDefault()
      }
      this.form.message = ''
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
  },
}
</script>
