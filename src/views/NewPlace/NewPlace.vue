<template lang="pug">
section
    h1 Add new place
    b-form(@submit="onSubmit" @reset="onReset"  v-if="show")
        b-form-group(
            id="name-input-group"
            :label="$t('newPlace.name')"
            label-for="name"
        )
            b-form-input(
                id="name"
                name="name"
                v-model="form.name"
                type="text"
                required
                :placeholder="$t('newPlace.enterPlaceName')"
            )
        .mt-4
        b-button.mr-2(type="submit" variant="primary") {{$t('newPlace.submit')}}
        b-button(type="reset" variant="danger") {{$t('newPlace.reset')}}
</template>

<script>
import router from "@/router";
import { postPlace } from "@/apis/apis";
export default {
  data() {
    return {
      form: {
        name: "",
      },
      show: true,
    };
  },
  methods: {
    async onSubmit(evt) {
      try {
        evt.preventDefault();
        postPlace(this.form);
        router.replace("/list", () => {
          this.$root.$bvToast.toast(`Place ${this.form.name} created`, {
            title: "Success",
            variant: "success",
            solid: true,
          });
        });
      } catch (err) {
        this.$bvToast.toast(`Place could not be created`, {
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
      this.form.name = "";
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>
