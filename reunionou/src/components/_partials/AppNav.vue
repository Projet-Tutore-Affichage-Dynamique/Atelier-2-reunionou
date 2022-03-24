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
          <li class="nav-item">
            <router-link class="nav-link active" aria-current="page" to="/login">Me connecter</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link active" aria-current="page" to="/register">Créer un compte</router-link>
          </li>
        </ul>
        <ul class="navbar-nav">
          <li v-if="this.$parent.token" class="nav-item">
            <router-link class="nav-link" aria-current="page" to="/account">Mon compte</router-link>
          </li>
          <li v-if="this.$parent.token" class="nav-item">
            <router-link class="nav-link" aria-current="page" to="/events">Mes rendez-vous</router-link>
          </li>
          <li v-if="this.$parent.token" class="nav-item">
            <a href="javascript:void(0)" @click="handleClick" class="nav-link" >Déconnexion</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
    return: 'AppNav',
    props: ['user'],
    methods: {
      handleClick(){
        localStorage.removeItem('token')
        this.$router.push('/')
      }
    }
}
</script>
