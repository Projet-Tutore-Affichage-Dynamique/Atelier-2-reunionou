<template>
  <div class="container w-50 my-5">
    <h1 class="mb-5 border-bottom pb-2">Mon compte</h1>
    <form class="container w-50 my-5" @submit.prevent="handleSubmit">
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">Email</label>
      <input
        v-model="email"
        type="email"
        class="form-control"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
      />
    </div>
    <div class="mb-3">
      <label for="name" class="form-label">Nom</label>
      <input
        v-model="login"
        type="text"
        class="form-control"
        id="name"
      />
    </div>
    <a href="/account/password" class="btn btn-outline-primary">modifier mon mot de passe</a>
    <button type="submit" class="btn btn-primary">
      Modifier mon compte
    </button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "AppAccount",
  data() {
    return {
      token: null,
      login: "",
      email: "",
      pwd: "",
      oldpwd: "",
      confpwd: "",
      profile: null
    };
  },
  beforeMount(){
      if(!localStorage.token){
        this.$router.go('/login')
      }

      this.token = localStorage.token;
      
      axios
        .get("http://localhost:8081/auth/profile", {
          headers: { 
            'Authorization': `token ${localStorage.token}` 
          }
        })
        .then((response) => {
          this.profile = response.data.user;
          this.email = this.profile.email;
          this.login = this.profile.login;
        })
        .catch((error) => {
          console.log(error)
          this.errored = true;
        });
  },
    methods: {
      async handleSubmit() {
        axios
          .post("http://localhost:8081/auth/profile", 
          {
            login: this.login,
            email: this.email,
            oldpwd: this.oldpwd,
            pwd: this.pwd,
            confpwd: this.conf_pwd
          },
          {
            headers: {
              "Authorization": `token ${localStorage.token}`,
            },
          })
          .then((response) => {
            this.profile = response;
            this.$router.push({ name: 'Events' })

          })
          .catch((error) => {
            console.log(error)
            this.errored = true;
          });
      },
    }
};
</script>
