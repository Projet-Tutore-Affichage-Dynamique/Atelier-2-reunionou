<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid d-flex justify-content-between">
      <a class="navbar-brand" href="/">
        🤝 Reunionou
      </a>    
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li v-if="this.token == null" class="nav-item">
            <a class="nav-link active" aria-current="page" href="/login">Me connecter</a>
          </li>
          <li v-if="this.token == null" class="nav-item">
            <a class="nav-link active" aria-current="page" href="/register">Créer un compte</a>
          </li>
        </ul>
        <ul class="navbar-nav">
          <li v-if="this.token" class="nav-item">
            <router-link class="nav-link" aria-current="page" to="/account">Mon compte</router-link>
          </li>
          <li v-if="this.token" class="nav-item">
            <router-link class="nav-link" aria-current="page" to="/events">Mes rendez-vous</router-link>
          </li>
          <li v-if="this.token" class="nav-item">
            <a href="javascript:void(0)" @click="handleClick" class="nav-link" >Déconnexion ({{this.login}})</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
    return: 'AppNav',
    data() {
      return {
        token: null,
        login: null,
        id: null
      };
    },
    beforeMount() {
      if(localStorage.token && localStorage.login && localStorage.id){
        this.login = localStorage.login;
        this.token = localStorage.token;
        this.id = localStorage.id;
      }
    },
    methods: {
      handleClick(){
        localStorage.removeItem('token');
        localStorage.removeItem('login');
        localStorage.removeItem('id'); 
        this.$router.push({ name: 'Home' })      }
    }
}
</script>
