<template>
  <div>
    <main class="container">
      <h1>Voulez-vous rejoindre l'événement : {{event.titre}} ?</h1>
      <h6>{{event.description}}</h6>
      <div class="">
        <p><span class="fw-bold">Date :</span> {{event.date_RV}}</p>
        <p><span class="fw-bold">Géolocalisation :</span> {{event.geoloc}}</p>
      </div>
    </main>
    <aside class="container d-flex flex-row justify-content-between">
      <div class="border-top mt-5 text-center">
        <h3>Si oui, veuillez remplir le formulaire suivant :</h3>
        <form class="container w-50 my-0" @submit.prevent="handleSubmit">
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
        Votre email nous serviva à vous renvoyer un rappel pour l'événement.
      </div>
    </div>
    <div class="mb-3">
      <label for="nom_prenom" class="form-label required">Nom/Prenom</label>
      <input v-model="nom_prenom" type="text" class="form-control" id="nom_prenom" name="nom_prenom"/>
    </div>
    <div class="my-4">
      <button type="submit" class="btn btn-primary me-2">
        Rejoindre l'événement
      </button>
    </div>
  </form>
      </div>
      <div class="border-top mt-5 text-center">
        <h3 class="mb-3">Si non, vous pouvez retourner à la page d'accueil :</h3>
        <router-link class="btn btn-outline-secondary" aria-current="page" to="/">Retour</router-link>
      </div>
    </aside>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "AppEventJoin",
  data() {
    return {
      event: null,
      token: null,
      id: null,
      messages: null,
      users: null,
      invitations: null,
      nom_prenom: "",
      email: "",
    };
  },
  beforeMount(){
      if(!localStorage.token){
        this.$router.go('/')
      }

      this.token = localStorage.token;
      this.login = localStorage.login;
      this.id = localStorage.id;
      
      axios
        .get("http://51.210.15.53:8081/events/"+this.$route.params.id, {
          headers: { 
            'Authorization': `token ${this.token}` 
          }
        })
        .then((response) => {
          this.event = response.data.event;
        })
        .catch((error) => {
          console.log(error)
          this.errored = true;
        });

        axios
        .get("http://51.210.15.53:8081/events/"+this.$route.params.id+"/messages", {
          headers: { 
            'Authorization': `token ${this.token}` 
          }
        })
        .then((response) => {
          this.messages = response.data;
        })
        .catch((error) => {
          console.log(error)
          this.errored = true;
        });

        axios
        .get("http://51.210.15.53:8081/auth/users", {
          headers: { 
            'Authorization': `token ${this.token}` 
          }
        })
        .then((response) => {
          this.users = response.data.users;
        })
        .catch((error) => {
          console.log(error)
          this.errored = true;
        });

        axios
        .get("http://51.210.15.53:8081/events/"+this.$route.params.id+"/invitations",
          {
            headers: {
              "Authorization": `token ${localStorage.token}`,
            },
          })
        .then((response) => {
          this.invitations = response.data.invitation;
        })
        .catch((error) => {
          console.log(error)
          this.errored = true;
        });
  },
  methods: {
    async handleSubmit() {
      axios
      // A adapater avec la nouvelle table de la BDD
        .post("http://51.210.15.53:8081/auth/signup", {
          login: this.login,
          email: this.email,
          pwd: this.pwd,
          confpwd: this.conf_pwd
        })
        .then((response) => {
          this.infos = response;
          console.log(response);
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
