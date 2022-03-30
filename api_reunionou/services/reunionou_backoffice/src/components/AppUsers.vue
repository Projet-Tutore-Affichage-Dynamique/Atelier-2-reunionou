<template>
  <div>
    <main class="container">
      <h1>Utilisateurs</h1>
      <aside class="mb-5">
        <!--<button class="btn btn-success"><router-link class="nav-link active" aria-current="page" to="/new_event" style="color:white">Créer un nouvel événement</router-link></button> -->
      </aside>

      <div class="row row-cols-1 row-cols-md-5 g-4">
        <div class="col" v-for='user in users.data.users' :key='user._id'  >
          <div class="card h-100">
            <img src="https://picsum.photos/200" class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">{{ user.login }}</h5>
              <p class="card-text">Email : {{ user.email }}</p>
              <br>
              <small class="text-muted">Dernière connexion : {{ convert_dateLastConnection(user.last_connected) }}</small>
            </div>
            <div class="card-footer">
              <!--<button type="button" class="btn btn-danger me-2" v-on:click="show_Toast(user)">Supprimer</button>-->
            </div>
          </div>
        </div>
      </div>

    <br>
    <br>
    <h1>Utilisateur inactifs</h1>
    <div class="row row-cols-1 row-cols-md-5 g-4">
        <div class="col" v-for='user in inactiveUsers.data.users' :key='user._id'  >
          <div class="card h-100">
            <img src="https://picsum.photos/200" class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">{{ user.login }}</h5>
              <p class="card-text">Email : {{ user.email }}</p>
              <br>
              <small class="text-muted">Dernièrement connexion : {{ convert_dateLastConnection(user.last_connected) }}</small>
            </div>
            <div class="card-footer">
              <button type="button" class="btn btn-danger me-2" v-on:click="show_Toast(user)">Supprimer</button>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- TOAST -->
    <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
      <div id="toast" class="toast">
        <div class="toast-header">
          <img src="" class="rounded me-2" alt="...">
          <strong class="me-auto">Supprimer</strong>
          <small>Now</small>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">
          Voulez-vous vraiment supprimer l'utilisateur suivant : {{ this.user_suppr }}

          <div class="mt-2 pt-2 border-top">
            <button type="button" class="btn btn-primary btn-sm" v-on:click="deleteUser">OUI</button>
            <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="toast" v-on:click="hide_Toast">NON</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "AppUsers",
  data() {
    return {
      users: null,
      token: null,
      login: null,
      id: null,
      inactiveUsers:null,

      user_suppr: '',
      user_idSuppr: ''
    };
  },
  beforeMount(){
    if(!localStorage.token){
      this.$router.push({ name: 'Home' })
    }

    this.token = localStorage.token;
    this.login = localStorage.login;
    this.id = localStorage.id;

    axios
        .get("http://localhost:8083/users", {
          headers: {
            'Authorization': `token ${this.token}`
          }
        })
        .then((response) => {
          this.users = response;
        })
        .catch((error) => {
          this.errored = true;
          console.log(error);
        });


     axios
      .get("http://localhost:8083/users/inactiveusers/", {
          headers: {
            'Authorization': `token ${this.token}`
          }
        })
      .then((response) => {
          console.log(response)
          this.inactiveUsers = response;
      })
      .catch((error) => {
          this.errored = true;
          console.log(error);
      });
  },

  methods: {
    convert_dateLastConnection(date){
      let d = new Date(date);
      let now = new Date();

      let diff = now.getTime() - d.getTime();

      if(diff > 86400000){
        let nb = diff / 86400000;

        return parseInt(nb, 10)+' jours';
      } else{
        return "Ajourd'hui";
      }
    },

    show_Toast(user){
      console.log('show_Toast');
      this.user_suppr = user.login;
      this.user_idSuppr = user.id;

      document.getElementById('toast').classList.add("show");
    },

    hide_Toast(){
      this.user_suppr = '';
      this.user_idSuppr = '';

      document.getElementById('toast').classList.remove("show");
    },

    deleteUser(){
      axios
          .delete("http://localhost:8083/users/"+this.user_idSuppr, {
            headers: {
              'Authorization': `token ${this.token}`
            }
          })
          .then((response) => {
            this.hide_Toast();
            this.reload_Users();
            console.log("Utilisateur supprimé !" + response);
            this.$router.go();
          })
          .catch((error) => {
            this.errored = true;
            console.log(error);
          });
    },


    reload_Users(){
      axios
          .get("http://localhost:8083/users", {
            headers: {
              'Authorization': `token ${this.token}`
            }
          })
          .then((response) => {
            this.users = response;
          })
          .catch((error) => {
            this.errored = true;
            console.log(error);
          });
    }
  }
};
</script>