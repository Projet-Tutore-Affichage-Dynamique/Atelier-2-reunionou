<template>
  <div>
    <main class="container">
      <h1>Evénement: {{event.titre}}</h1>
      <h6>{{event.description}}</h6>
      <div class="">
        <p><span class="fw-bold">Date :</span> {{event.date_RV}}</p>
        <p><span class="fw-bold">Géolocalisation :</span> {{event.geoloc}}</p>
        <p v-if="event.id_createur == this.id">
          <span class="fw-bold">Lien de partage : </span>
          <input class="fake-link" v-on:focus="$event.target.select()" ref="clone" readonly :value="text"/>
          &nbsp;
          <button class="btn btn-outline-secondary" @click="copyToClipboard()">Copier le lien</button></p>
      </div>
      <div v-if="event.id_createur != this.id">
        <h4>Réponse</h4>
        <form @submit.prevent="sendAnswer" class="d-flex flex-row gap-2">
        <select v-model="choice" class="form-select" aria-label="Default select example">
          <option selected>Choisi ta réponse</option>
          <option value="1">Intéressé</option>
          <option value="2">Je viens</option>
          <option value="3">Je ne viens pas</option>
        </select>
        <button class="btn btn-primary me-2">Envoyer</button>
        </form>
      </div>
    </main>
    <aside class="container d-flex flex-row justify-content-between">
      <div class="border-top mt-5">
        <h2>Messages</h2>
        <article v-for='message in messages' :key='message._id'>
          <h6><span class="badge bg-primary">{{getLoginOfUser(message.id_createur)}}{{this.names[message.id]}}</span></h6>
          {{message.message}} <span class="badge bg-secondary">{{message.date}}</span>
        </article>
      </div>
      <div class="border-top mt-5">
        <h2>Invitations</h2>
        <div>
        <article v-for='user in users' :key='user._id'>
          <div v-if="user.id != this.id">
          {{user.login}} 
            <a v-if="event.id_createur == this.id" href="javascript:void(0)" @click="sendInvite(user.id)">Inviter</a>
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
      invitations: null,
      choice: null,
      names: [],
      text: null,
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
          this.text = "http://localhost:8080/event_join/" + this.event.id_createur + "/" + this.event.id;
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
          this.messages = response.data.messages;
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
    },
    getLoginOfUser(id_user){
        axios
        .get(
          "http://localhost:8081/auth/user/id/"+id_user,
          {
            headers: {
              "Authorization": `token ${localStorage.token}`,
            },
          }
        )
        .then((response) => {
          this.names.push('login', response.data.users[0].login) 
        })
        .catch((error) => {
          console.log(error);
          this.errored = true;
        });  
    },
    sendAnswer(){
      let route = '';
      if(this.choice == 1){
        route = 'interested'
      }else if (this.choice == 2){
        route = 'accept'
      } else {
        route = 'decline'
      }

      console.log("http://localhost:8081/events/"+route);

      axios
        .post("http://localhost:8081/events/"+route, 
          {
            id_event: this.event.id,
            msg: '',
          },
          {
            headers: {
              "Authorization": `token ${localStorage.token}`,
            },
          }
        )
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error)
          this.errored = true;
        });
    },
    copyToClipboard() {
    this.$refs.clone.focus();
      document.execCommand('copy');
    },
  }
};
</script>
