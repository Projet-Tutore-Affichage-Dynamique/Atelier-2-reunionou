<template>
<div>
  <main class="container">
    <h1>Evenements</h1>
    <aside class="mb-5">
      <!-- <button class="btn btn-success"><router-link class="nav-link active" aria-current="page" to="/new_event" style="color:white">Créer un nouvel événement</router-link></button> -->
    </aside>

    <div class="row row-cols-1 row-cols-md-5 g-4">
       <div class="col" v-for='event in events.data.events' :key='event._id'  >
        <div class="card h-100">
          <img src="https://picsum.photos/200" class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">{{ event.title }}</h5>
            <p class="card-text">{{ event.description }}</p>
            <br>
            <small v-if="(new Date(event.date_RV)) > (new Date())" class="text-muted">{{ new Date(event.date_RV).toDateString() }}</small>
            <small v-else class="text-danger">Expiré depuis {{ convert_dateExpired(event.date_RV) }}</small>
          </div>
          <div class="card-footer">
            <!--<button type="button" class="btn btn-danger me-2" v-if="(new Date(event.date_RV).getTime()) < (new Date().getTime())" v-on:click="show_Toast(event)">Supprimer</button>-->
          </div>
        </div>
      </div>
    </div>
    <br>
    <br>
    <h1>Evenements expirés</h1>
    <div class="row row-cols-1 row-cols-md-5 g-4">
       <div class="col" v-for='event in expiredEvents.data.events' :key='event._id'  >
        <div class="card h-100">
          <img src="https://picsum.photos/200" class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">{{ event.title }}</h5>
            <p class="card-text">{{ event.description }}</p>
            <br>
            <small v-if="(new Date(event.date_RV)) > (new Date())" class="text-muted">{{ new Date(event.date_RV).toDateString() }}</small>
            <small v-else class="text-danger">Expiré depuis {{ convert_dateExpired(event.date_RV) }}</small>
          </div>
          <div class="card-footer">
            <button type="button" class="btn btn-danger me-2" v-if="(new Date(event.date_RV).getTime()) < (new Date().getTime())" v-on:click="show_Toast(event)">Supprimer</button>
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
        Voulez-vous vraiment supprimer l'évènement suivant : {{ this.event_suppr }}

        <div class="mt-2 pt-2 border-top">
          <button type="button" class="btn btn-primary btn-sm" v-on:click="deleteEvent">OUI</button>
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
  name: "AppEvents",
  data() {
    return {
      events: null,
      token: null,
      login: null,
      id: null,
      expiredEvents:null,

      event_suppr: '',
      event_idSuppr: ''
    };
  },
  beforeMount(){
      if(!localStorage.token){
        this.$router.push({ name: 'Home' })
      }

      this.token = localStorage.token;
      this.login = localStorage.login;
      this.id = localStorage.id;

      // Refresh nav
      this.$root.$refs.nav.$forceUpdate;

      axios
        .get("http://localhost:8083/events/all", {
          headers: { 
            'Authorization': `token ${this.token}` 
          }
        })
        .then((response) => {
          this.events = response;
          console.log(response);
          
        })
        .catch((error) => {
          console.log(error)
          this.errored = true;
        });

      axios
        .get("http://localhost:8083/events/eventsexpired", {
            headers: {
              'Authorization': `token ${this.token}`
            }
        })
        .then((response) => {
            this.expiredEvents = response;
            console.log(response)
        })
        .catch((error) => {
            this.errored = true;
            console.log(error);
        });
      
  },
  methods: {
    convert_dateExpired(date){
      let d = new Date(date);
      let now = new Date();

      let diff = now.getTime() - d.getTime();

      if(diff > 86400000){
        let nb = diff / 86400000;

        return parseInt(nb, 10)+' jours';
      } else{
        return '- 1 jour';
      }
    },

    show_Toast(event){
      console.log('show_Toast');
      this.event_suppr = event.titre;
      this.event_idSuppr = event.id;

      document.getElementById('toast').classList.add("show");
    },

    hide_Toast(){
      this.event_suppr = '';
      this.event_idSuppr = '';

      document.getElementById('toast').classList.remove("show");
    },

    deleteEvent(){
      console.log('id_event: '+this.event_idSuppr);
      axios
          .delete("http://localhost:8083/events/"+this.event_idSuppr, {
            headers: {
              'Authorization': `token ${this.token}`
            }
          })
          .then((response) => {
            this.hide_Toast();
            this.reload_Events();
            console.log("Evenement supprimé !" + response);
            this.$router.go();
          })
          .catch((error) => {
            this.errored = true;
            console.log(error);
          });
    },


    getExpiredEvent(){
      //console.log('id_event: '+this.event_idSuppr);
      axios
          .get("http://localhost:8083/events/eventsexpired", {
            headers: {
              'Authorization': `token ${this.token}`
            }
          })
          .then((response) => {
            this.expiredEvents = response;
            console.log(response)
          })
          .catch((error) => {
            this.errored = true;
            console.log(error);
          });
    },


    reload_Events(){
      axios
          .get("http://localhost:8083/events/all", {
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
