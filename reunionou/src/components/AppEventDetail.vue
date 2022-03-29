<template>
<div>
  <main class="container">
    <h1>Evénement: {{event.titre}}</h1>
    <h6>{{event.description}}</h6>
    <div class="">
      <p><span class="fw-bold">date :</span> {{event.date_RV}}</p>
      <p><span class="fw-bold">Géolocalisation :</span> {{event.geoloc}}</p>
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
      event: null,
      token: null,
      id: null
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
        .get("http://localhost:8081/events/"+this.$route.params.id, {
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
  },
};
</script>
