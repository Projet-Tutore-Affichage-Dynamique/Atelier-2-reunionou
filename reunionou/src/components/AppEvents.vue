<template>
  <div>
    <main class="container">
      <h1>Mes événements</h1>
      <aside class="mb-5">
        <button class="btn btn-success"><router-link class="nav-link active" aria-current="page" to="/new_event" style="color:white">Créer un nouvel événement</router-link></button>
      </aside>
      <h4>Ils arrivent bientôt</h4>
      <div class="row row-cols-1 row-cols-md-5 g-4">
        <div class="col" v-for='event in events' :key='event._id'  >
          <div class="card h-100">
            <img src="https://picsum.photos/200" class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title"><a v-bind:href="'/events/'+ event.id">{{event.titre}}</a></h5>
              <p class="card-text">
                {{event.description}}
              </p>
            </div>
            <div class="card-footer">
              <small class="text-muted">{{event.date_RV}}</small>
            </div>
          </div>
        </div>
      </div>
    </main>
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
      id: null
    };
  },
  beforeMount(){
      this.token = localStorage.token;
      this.login = localStorage.login;
      this.id = localStorage.id;
      
      axios
        .get("http://51.210.15.53:8081/events", {
          headers: { 
            'Authorization': `token ${this.token}` 
          }
        })
        .then((response) => {
          this.events = response.data.events;
        })
        .catch((error) => {
          console.log(error)
          this.errored = true;
        });
  },
};
</script>
