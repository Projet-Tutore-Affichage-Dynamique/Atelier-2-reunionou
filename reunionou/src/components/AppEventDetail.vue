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
    <aside class="container d-flex flex-row justify-content-between">
      <div class="border-top mt-5">
        <h2>Messages</h2>
        <article v-for='message in messages' :key='message._id'>
          <h6><span class="badge bg-primary">{{message.id_createur}}</span></h6>
          {{message.message}} <span class="badge bg-secondary">{{message.date}}</span>
        </article>
      </div>
      <div class="border-top mt-5">
        <h2>Invitations</h2>
      </div>
    </aside>
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
      id: null,
      messages: null
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

        axios
        .get("http://localhost:8081/events/"+this.$route.params.id+"/messages", {
          headers: { 
            'Authorization': `token ${this.token}` 
          }
        })
        .then((response) => {
          this.messages = response.data;
          console.log(this.messages);
        })
        .catch((error) => {
          console.log(error)
          this.errored = true;
        });
  },
};
</script>
