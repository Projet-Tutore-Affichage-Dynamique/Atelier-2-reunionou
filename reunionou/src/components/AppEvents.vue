<template>
<div>
  <main class="container">
    <h1>Mes événements</h1>
    <aside class="mb-5">
      <button class="btn btn-success">Créer un nouvel événement</button>
    </aside>
    <h4>Ils arrivent bientôt</h4>
    <div class="row row-cols-1 row-cols-md-5 g-4">
       <div class="col" v-for='event in events.data.events' :key='event._id'  >
        <div class="card h-100">
          <img src="https://picsum.photos/200" class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">{{ event.description }}</h5>
            <p class="card-text">
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </p>
          </div>
          <div class="card-footer">
            <small class="text-muted">Dans 3 jours · 23/03/22</small>
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
      if(!localStorage.token){
        // this.$router.go('/')
        console.log('ici')
      }

      this.token = localStorage.token;
      this.login = localStorage.login;
      this.id = localStorage.id;
      
      axios
        .get("http://localhost:8081/events", {
          headers: { 
            'Authorization': `token ${this.token}` 
          }
        })
        .then((response) => {
          this.events = response;
        })
        .catch((error) => {
          console.log(error)
          this.errored = true;
        });
  },
};
</script>
