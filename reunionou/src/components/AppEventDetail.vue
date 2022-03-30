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
        <div v-if="event.id_createur == this.id">
        <article v-for='user in users' :key='user._id'>
          <div v-if="user.id != this.id">
          {{user.login}} 
            <a href="javascript:void(0)" @click="sendInvite(user.id)">inviter</a>
            <span v-for="invit in invitations" :key='invit._id'> 
              <span v-if="invit.id_invite == user.id">
                {{getStatus(invit.status)}}
              </span>
            </span>
          </div>
        </article>
        </div>
      </div>
    </aside>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "AppEventDetail",
  data() {
    return {
      event: null,
      token: null,
      id: null,
      messages: null,
      users: null,
      invitations: null
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
        })
        .catch((error) => {
          console.log(error)
          this.errored = true;
        });

        axios
        .get("http://localhost:8081/auth/users", {
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
        .get("http://localhost:8081/events/"+this.$route.params.id+"/invitations",
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
    async sendInvite(invite_id){
       axios
        .post(
          "http://localhost:8081/events/invite",
          {
            id_event: this.event.id,
            id_invite: invite_id,
            id_user: this.id
          },
          {
            headers: {
              "Authorization": `token ${localStorage.token}`,
            },
          }
        )
        .then((response) => {
          this.infos = response;
          console.log(response);
          if (response) {
            this.$router.push("/events");
          } else {
            return null;
          }
        })
        .catch((error) => {
          console.log(error);
          this.errored = true;
        });
    },
    getStatus(status){
      let str ="";
      switch (status) {
        case 0:
            str = 'Invité';
          break;
        case 1:
            str = 'Intéressé';
          break;
        case 2:
            str = 'Viens';
          break;
        case 3:
            str = 'Ne viens pas';
          break;
        default:
            str = null;
          break;
      }
      return str;
    }
  }
};
</script>
