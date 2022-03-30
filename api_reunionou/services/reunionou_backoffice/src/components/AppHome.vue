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
            Reunionou BackOffice est la plateforme pour les admins qui permet de gérer et supprimer les évènement et compte inactifs pour mettre un peu d'ordre.
            Vous pourrez aussi gérer votre compte,
            mais si vous voulez participer aux évènement même en tant qu'admin il faudra passer par la platforme utilisateur.
          </h5>
        </div>
      </div>
    </div>
    <div class="text-center mb-5">
     <router-link class="btn btn-lg btn-outline-primary mx-2" aria-current="page" to="/login">Me connecter</router-link>
    </div>
  </section>
</template>

<script>
export default {
  name: "AppHome",
};
</script>
