<template>
  <form class="container w-50 my-5" @submit.prevent="handleSubmit">
    <h1 class="mb-5 border-bottom pb-2">Connexion</h1>
    <div class="mb-3">
      <label for="email" class="form-label">Email</label>
      <input
        v-model="email"
        type="email"
        class="form-control"
        id="email"
        aria-describedby="emailHelp"
      />
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
      <button class="btn btn-primary me-2">Connexion</button>
      <a
        href="javascript:void(0)"
        @click="handleClick"
        class="btn btn-outline-secondary"
        >Créer un compte</a
      >
    </div>
  </form>
</template>

<script>
import axios from "axios";
export default {
  name: "AppLogin",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
async handleSubmit() {
      axios
        .post("http://localhost:8081/auth/signin", {
          email: this.email,
          password: this.password
        })
        .then((response) => {
          this.infos = response;
          if(response){
            this.$router.push("/events")
          }else{
            return null;
          }
        })
        .catch((error) => {
          console.log(error)
          this.errored = true;
        })
    },
    handleClick() {
      this.$router.push("/register");
    },
  },
};
</script>
