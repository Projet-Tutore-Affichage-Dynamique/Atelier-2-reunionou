<template>
  <section class="h-100">
    <div class="container d-flex flex-column justify-content-around h-100 py-5">
      <div class="d-flex justify-content-center align-items-center mb-3">
        <div class="col-sm-8 text-center">
          <h1 class="display-5 font-weight-bold">
            Les <span class="text-primary">Amis</span> sont ceux qui font la
            vie.
          </h1>
        </div>
      </div>
      <div class="d-flex justify-content-center align-items-center mb-3">
        <div class="col-sm-8 text-center">
          <h5 class="text-muted font-weight-normal">
            Reunionou est la plateforme que permets de gérer vos rencontres.
            Plus qu'une simple plateforme de gestion de rendez-vous, c'est un
            planner qui vous fera gagner du temps.
          </h5>
        </div>
      </div>
    </div>
    <div class="text-center mb-5">
     <router-link class="btn btn-lg btn-primary mx-2" aria-current="page" to="/register">Créer un compte</router-link>
     <router-link class="btn btn-lg btn-outline-primary mx-2" aria-current="page" to="/login">Me connecter</router-link>
    </div>
    <div class="text-center">
      <router-link class="btn btn-outline-secondary" aria-current="page" to="/faq">F.A.Q.</router-link>
    </div>
  </section>
</template>

<script>
export default {
  name: "AppHome",
};
</script>
