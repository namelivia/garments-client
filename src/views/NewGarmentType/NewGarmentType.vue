<template lang="pug">
section
    h1 Add new garment_type
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
import router from "@/router";
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
        await this.$axios.post(
          `${process.env.VUE_APP_API_ENDPOINT}/garment_types`,
          this.form
        );
        router.replace("/list", () => {
          this.$root.$bvToast.toast(`GarmentType ${this.form.name} created`, {
            title: "Success",
            variant: "success",
            solid: true,
          });
        });
      } catch (err) {
        console.log(err);
        this.$bvToast.toast(`GarmentType could not be created`, {
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
