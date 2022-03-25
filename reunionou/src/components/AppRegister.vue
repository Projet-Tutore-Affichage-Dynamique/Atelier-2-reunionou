<template>
<div>
  <form class="container w-50 my-5" @submit.prevent="handleSubmit">
    <h1 class="mb-5 border-bottom pb-2">Création de compte</h1>
    <div class="mb-3">
      <label for="email" class="form-label required">Email</label>
      <input
        v-model="email"
        type="email"
        class="form-control"
        id="email"
        aria-describedby="emailHelp"
        name="email"
      />
      <div id="emailHelp" class="form-text">
        Votre email est votre identifiant de connexion.
      </div>
    </div>
    <div class="mb-3">
      <label for="login" class="form-label required">Username</label>
      <input v-model="login" type="text" class="form-control" id="login" name="login"/>
    </div>
    <div class="mb-3">
      <label for="pwd" class="form-label required">Mot de passe</label>
      <input
        v-model="pwd"
        type="password"
        class="form-control"
        id="pwd"
      />
    </div>
    <div class="mb-3">
      <label for="conf_pwd" class="form-label required">Confirmer le mot de passe</label>
      <input
        v-model="conf_pwd"
        type="password"
        class="form-control"
        id="conf_pwd"
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
</div>
</template>

<script>
import axios from "axios";

export default {
  name: "AppRegister",
  data() {
    return {
      login: "",
      email: "",
      pwd: "",
      conf_pwd: ""
    };
  },
  methods: {
    async handleSubmit() {
      axios
        .post("http://localhost:8081/auth/signup", {
          login: this.login,
          email: this.email,
          pwd: this.pwd,
          confpwd: this.conf_pwd
        })
        .then((response) => {
          this.infos = response;
          if(response){
            this.$router.push("/login")
          }else{
            return null;
          }
        })
        .catch((error) => {
          console.log(error)
          this.errored = true;
        });
    },
    handleClick() {
      this.$router.push("/login");
    },
  },
};
</script>