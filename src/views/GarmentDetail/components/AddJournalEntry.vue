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
        await this.$axios.post(
          `${process.env.VUE_APP_API_ENDPOINT}/garments/${this.garmentId}/journal`,
          this.form
        );
        this.$bvToast.toast(`Journal entry added`, {
          title: "Success",
          variant: "success",
          solid: true,
        });
        this.onReset();
      } catch (err) {
        this.$bvToast.toast(`Journal entry could not be added`, {
          title: "Error",
          variant: "danger",
          solid: true,
        });
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
