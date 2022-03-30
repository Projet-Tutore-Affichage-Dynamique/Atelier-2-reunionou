<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid d-flex justify-content-between">
      <a class="navbar-brand" href="/" v-if="this.token == null">
        🤝 Reunionou
      </a>    
      <a class="navbar-brand" href="/account" v-if="this.token != null">
        🤝 Reunionou - Mon compte
      </a>    
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse d-flex justify-content-between" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li v-if="this.token == null" class="nav-item">
            <a class="nav-link active" aria-current="page" href="/login">Me connecter</a>
          </li>
          <li v-if="this.token == null" class="nav-item">
            <a class="nav-link active" aria-current="page" href="/register">Créer un compte</a>
          </li>
          <li v-if="this.token == null" class="nav-item">
            <router-link class="nav-link active" aria-current="page" to="/faq">F.A.Q.</router-link>
          </li>
        </ul>
        <ul class="navbar-nav ">
          <li v-if="this.token" class="nav-item">
            <a class="nav-link active" aria-current="page" href="/events">Mes événements</a>
          </li>
          <li v-if="this.token" class="nav-item">
            <a class="nav-link active" aria-current="page" href="/events">Mes invitations</a>
          </li>
        </ul>          
        <ul class="navbar-nav">
          <li v-if="this.token" class="nav-item">
            <a href="javascript:void(0)" @click="logout" class="nav-link" >Déconnexion ({{this.login}})</a>
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
      logout(){
        localStorage.removeItem('token');
        localStorage.removeItem('login');
        localStorage.removeItem('id'); 
        this.$router.push({ name: 'Home' })
        },
            handleClickEvent(){
          this.$router.push({ name: 'Events'});
    }
    }
}
</script>
