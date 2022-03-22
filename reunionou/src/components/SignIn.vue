<template>
  <div class="container text-center">
    <h1>CONNEXION</h1>

    Identifiant:
    <input v-model="id" type="text" name="Identifiant" class="m-1">
    <br>
    Mot de passe:
    <input v-model="mdp" type="text" name="Mot de passe" class="m-1">
    <br>
    <input type="button" value="Connexion" v-on:click="signin">

  </div>
</template>

<script>
import axios from "axios";

export default {
  data () {
    return {
      id: "",
      mdp: "",
      res: null
    }
  },
  methods : {
    signin() {
      axios.post("http://localhost:5001/auth/signin", {login: this.id, pwd: this.mdp})
      .then(function (res) {
        console.log("connection etablie "+res);
      })
      .catch(function (res) {
        console.log("connection echoue "+res);
      })
    },
  }
}
</script>