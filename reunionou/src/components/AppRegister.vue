<template>
  <form class="container w-50 my-5" @submit.prevent="handleSubmit">
    <h1 class="mb-5 border-bottom pb-2">Création de compte</h1>
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">Email</label>
      <input
        v-model="email"
        type="email"
        class="form-control"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
      />
      <div id="emailHelp" class="form-text">
        Votre email est votre identifiant de connexion.
      </div>
    </div>
    <div class="mb-3">
      <label for="name" class="form-label">Nom</label>
      <input v-model="name" type="text" class="form-control" id="name" />
    </div>
    <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label">Mot de passe</label>
      <input
        v-model="password"
        type="password"
        class="form-control"
        id="exampleInputPassword1"
      />
    </div>
    <div class="my-5">
      <button type="submit" class="btn btn-primary me-2">
        Créer mon compte
      </button>
      <a
        href="javascript:void(0)"
        @click="handleClick"
        class="btn btn-outline-secondary"
        >Connexion</a
      >
    </div>
  </form>
</template>

<script>
import axios from "axios";
export default {
  name: "AppRegister",
  data() {
    return {
      name: "",
      email: "",
      password: "",
    };
  },
  methods: {
    async handleSubmit() {
      await axios.post("http://localhost:5001/auth/signup", {
          name: this.name,
          email: this.email,
          password: this.password
        });
      this.$router.push("/login");
    },
    handleClick() {
      this.$router.push("/login");
    },
  },
};
</script>
