<template>
<div>
  <main class="container">
    <h1>Mes invitations</h1>
    <div class="list-group">
      <a v-for="invit in invitations" :key="invit._id" class="list-group-item list-group-item-action active" v-bind:href="'/events/'+ invit.id_event" aria-current="true">
        <div class="d-flex w-100 justify-content-between">
          {{getEvent(invit.id_event)}}
          <h5 class="mb-1">{{event.titre}}</h5>
          <small>{{event.date_RV}}</small>
        </div>
        <p class="mb-1">{{event.description}}</p>
        <small>{{event.geoloc}}</small>
      </a>
    </div>
  </main>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "AppInvitations",
  data() {
    return {
      invitations: null,
      token: null,
      login: null,
      id: null,
      event: null
    };
  },
  beforeMount(){
        axios
        .get("http://localhost:8081/events/invitations/all", {
          headers: { 
            'Authorization': `token ${localStorage.token}` 
          }
        })
        .then((response) => {
          this.invitations = response.data.invitations;
        })
        .catch((error) => {
          console.log(error)
          this.errored = true;
        });
  },
  methods: {
        getEvent(id_event){
        axios
        .get(
          "http://localhost:8081/events/"+id_event,
          {
            headers: {
              "Authorization": `token ${localStorage.token}`,
            },
          }
        )
        .then((response) => {
          
          this.event = response.data.event;
        })
        .catch((error) => {
          console.log(error);
          this.errored = true;
        });  
    }
  }
};
</script>
