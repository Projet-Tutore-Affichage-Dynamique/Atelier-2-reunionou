<template>
<div>
  <form class="container w-50 my-5" @submit.prevent="handleSubmit">
    <h1 class="mb-5 border-bottom pb-2">Connexion</h1>
    <div class="mb-3">
      <label for="login" class="form-label">Username</label>
      <input
        v-model="login"
        type="text"
        class="form-control"
        id="login"
        aria-describedby="login"
      />
    </div>
    <div class="mb-3">
      <label for="pwd" class="form-label">Mot de passe</label>
      <input
        v-model="pwd"
        type="password"
        class="form-control"
        id="pwd"
      />
    </div>
    <div class="my-5">
      <button class="btn btn-primary me-2">Connexion</button>
    </div>
  </form>
</div>
</template>

<script>
import axios from "axios";

export default {
  name: "AppLogin",
  data() {
    return {
      login: "",
      pwd: "",
    };
  },
  methods: {
  async handleSubmit() {
      axios
        .post("http://localhost:8083/auth/signin", {}, {
          auth: {
            username: this.login,
            password: this.pwd
          }
        })
        .then((response) => {
          this.infos = response;
          if(response){
            localStorage.token = this.infos.data.token;
            localStorage.login = this.infos.data.user.login;
            localStorage.id = this.infos.data.user.id;
            this.$router.push({ name: 'Events' })

          }else{
            return null;
          }
        })
        .catch((error) => {
          console.log(error)
          this.errored = true;
        });
  }
  },
};
</script>
