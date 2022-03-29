<template>
  <form class="container w-50 my-5" @submit.prevent="handleSubmit">
    <h1 class="mb-5 border-bottom pb-2">Créer un nouvel événement</h1>
    <div class="mb-3">
      <label for="titre" class="form-label required">Titre</label>
      <input
        v-model="titre"
        type="text"
        class="form-control"
        id="titre"
        name="titre"
        required
      />
    </div>
    <div class="mb-3">
      <label for="description" class="form-label">Description</label>
      <input
        v-model="description"
        type="text"
        class="form-control"
        id="description"
        name="description"
      />
    </div>
    <div class="mb-3">
      <label for="date" class="form-label required">Date</label>
      <input
        v-model="date"
        type="date"
        class="form-control"
        id="date"
        name="date"
        required
      />
    </div>
    <div class="mb-3">
      <label for="heure" class="form-label required">Heure</label>
      <input
        v-model="heure"
        type="time"
        class="form-control"
        id="heure"
        name="heure"
        required
      />
    </div>
    <div class="mb-3">
      <label for="conf_pwd" class="form-label required">Lieu</label>
      <input
        v-model="geoloc"
        type="text"
        class="form-control"
        id="geoloc"
        name="geoloc"
        required
      />
    </div>
    <div class="my-5">
      <button type="submit" class="btn btn-primary me-2">
        Créer l'événénement
      </button>
      <a
        href="javascript:void(0)"
        @click="handleClick"
        class="btn btn-outline-secondary"
        >Annuler</a
      >
    </div>
  </form>
</template>

<script>
import axios from "axios";
export default {
  name: "NewEvent",
  data() {
    return {
      titre: "",
      description: "",
      date: "",
      heure: "",
      geoloc: "",
    };
  },
  methods: {
    async handleSubmit() {
      axios
        .post(
          "http://localhost:8081/events/create",

          {
            titre: this.titre,
            description: this.description,
            date: this.date,
            heure: this.heure,
            geoloc: this.geoloc
          },
          {
            headers: {
            //   "Content-Type": "application/x-www-form-urlencoded",
              "Authorization": `token ${localStorage.token}`,
            },
          }
        )
        .then((response) => {
          this.infos = response;
          console.log(response);
          if (response) {
            this.$router.push("/events");
          } else {
            return null;
          }
        })
        .catch((error) => {
          console.log(error);
          this.errored = true;
        });
    },
    handleClick() {
      this.$router.push("/events");
    },
  },
};
</script>