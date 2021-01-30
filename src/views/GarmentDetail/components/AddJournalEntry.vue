<template lang="pug">
section
    b-form(@submit="onSubmit" @reset="onReset"  v-if="show")
        b-form-group(
            id="message-input-group"
            :label="$t('addJournalEntry.insertEntryManually')"
            label-for="message"
        )
            b-input-group
                b-form-input(
                    id="message"
                    name="messae"
                    v-model="form.message"
                    type="text"
                    :placeholder="$t('addJournalEntry.messageContent')"
                )
                b-input-group-append
                    b-button(type="submit" variant="primary" v-t="'addJournalEntry.add'")
</template>
<script>
import { postJournalEntry } from "@/apis/apis";
import { errorToast, okToast } from "@/helpers/ui";
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
        message: "",
      },
      show: true,
    };
  },
  methods: {
    async onSubmit(evt) {
      try {
        evt.preventDefault();
        postJournalEntry(this.garmentId, this.form);
        this.$bvToast.toast(`Journal entry added`, okToast);
        this.onReset();
      } catch (err) {
        this.$bvToast.toast(`Journal entry could not be added`, errorToast);
      }
    },
    onReset(evt) {
      if (evt) {
        evt.preventDefault();
      }
      this.form.message = "";
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>
