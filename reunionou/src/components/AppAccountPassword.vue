<template>
  <div class="container w-50 my-5">
    <h1 class="mb-5 border-bottom pb-2">Modification mot de passe</h1>
    <form class="container w-50 my-5" @submit.prevent="handleSubmit">
<div class="mb-3">
      <label for="exampleInputPassword1" class="form-label"
        >Ancien mot de passe</label
      >
      <input
        type="password"
        class="form-control"
        id="exampleInputPassword1"
        v-model="oldPwd"
      />
    </div>
    <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label"
        >Nouveau mot de passe</label
      >
      <input
        type="password"
        class="form-control"
        id="exampleInputPassword1"
        v-model="newPwd"
      />
    </div>
    <div class="mb-3" >
      <label for="exampleInputPassword1" class="form-label"
        >Confirmation mot de passe</label
      >
      <input
        type="password"
        class="form-control"
        id="exampleInputPassword1"
        v-model="confPwd"
      />
    </div>
    <button type="submit" class="btn btn-primary">
      Modifier mon mot de passe
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
      newPwd: "",
      oldPwd: "",
      confPwd: "",
      profile: null
    };
  },
    methods: {
      async handleSubmit() {
        axios
          .post("http://localhost:8081/auth/modify_pwd", 
          {
            oldPwd: this.oldPwd,
            newPwd: this.newPwd,
            confPwd: this.confPwd
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
