<template lang="pug">
section
    h3(v-if='loading' ) Loading...
    div(v-else)
        img.mb-4.img-fluid(:src="imageUrl")
        p.mb-0 Id: {{ garment.id}}
        p.mb-0 {{$t("garmentDetails.name")}}: {{ garment.name }}
        p.mb-0 {{$t("garmentDetails.garment_type")}}: {{ garment.garment_type}}
        p.mb-0 {{$t("garmentDetails.color")}}: {{ garment.color}}
        p.mb-0 {{$t("garmentDetails.status")}}: {{ garment.status}}
        p.mb-0 {{$t("garmentDetails.place")}}: {{ garment.place}}
        b-button(variant="danger" v-on:click="onDelete" v-t="'garmentDetails.deleteIt'")
        router-link(:to="{ name: 'edit', params: { garmentId: garmentId}}")
            b-button.ml-2(v-t="'garmentCard.editIt'")
        journal-entry(
            v-for='entry in journal' :key='entry.id'
            :message="entry.message"
            :timestamp="entry.timestamp"
        )
    add-journal-entry.mt-4(:garment-id="this.garmentId")
</template>

<script>
import { getJournal, getGarment, deleteGarment } from "@/apis/apis";
import { getImageUrl } from "@/apis/helpers";
import JournalEntry from "./components/JournalEntry";
import AddJournalEntry from "./components/AddJournalEntry";
import router from "@/router";
export default {
  components: {
    JournalEntry: JournalEntry,
    AddJournalEntry: AddJournalEntry,
  },
  props: {
    garmentId: {
      type: Number,
      default: 0,
    },
  },
  data: function () {
    return {
      journal: null,
      garment: null,
      loading: true,
    };
  },
  computed: {
    imageUrl: function () {
      if (this.garment.image) {
        return getImageUrl(this.garment.image);
      }
      return null;
    },
  },
  mounted: function () {
    this.loadJournal();
    this.loadGarment();
  },
  methods: {
    async loadJournal() {
      try {
        this.journal = getJournal(this.garmentId);
      } catch (err) {
        this.$bvToast.toast(`Journal can't be retrieved`, {
          title: "Error",
          variant: "danger",
          solid: true,
        });
      } finally {
        this.loading = false;
      }
    },
    async loadGarment() {
      try {
        this.garment = getGarment(this.garmentId);
      } catch (err) {
        this.$bvToast.toast(`Garment can't be retrieved`, {
          title: "Error",
          variant: "danger",
          solid: true,
        });
      } finally {
        this.loading = false;
      }
    },
    async onDelete(evt) {
      evt.preventDefault();
      try {
        deleteGarment(this.garment.id);
        router.replace("/list", () => {
          this.$root.$bvToast.toast(`Garment removed`, {
            title: "Success",
            variant: "success",
            solid: true,
          });
        });
      } catch (err) {
        console.log(err);
        this.$bvToast.toast(`Garment could not be removed`, {
          title: "Error",
          variant: "danger",
          solid: true,
        });
      }
    },
  },
};
</script>
