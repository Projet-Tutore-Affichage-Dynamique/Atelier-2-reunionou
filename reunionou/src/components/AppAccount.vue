<template>
  <div class="container w-50 my-5">
    <h1 class="mb-5 border-bottom pb-2">Mon compte</h1>
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">Email</label>
      <input
        v-if="!modif"
        v-model="email"
        type="email"
        class="form-control"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
        readonly
      />
      <input
        v-model="email"
        v-if="modif"
        type="email"
        class="form-control"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
      />
      <div id="emailHelp" class="form-text">
        Votre email est votre identifiant de connexion.
      </div>
    </div>
    <div class="mb-3">
      <label for="name" class="form-label">Nom</label>
      <input
        v-if="!modif"
        v-model="name"
        type="text"
        class="form-control"
        id="name"
        readonly
      />
      <input
        v-if="modif"
        v-model="name"
        type="text"
        class="form-control"
        id="name"
      />
    </div>
    <div class="mb-3" v-if="modif">
      <label for="exampleInputPassword1" class="form-label"
        >Ancien mot de passe</label
      >
      <input
        v-model="password"
        type="password"
        class="form-control"
        id="exampleInputPassword1"
      />
    </div>
    <div class="mb-3" v-if="modif">
      <label for="exampleInputPassword1" class="form-label"
        >Nouveau mot de passe</label
      >
      <input
        v-model="password"
        type="password"
        class="form-control"
        id="exampleInputPassword1"
      />
    </div>
    <div class="mb-3" v-if="modif">
      <label for="exampleInputPassword1" class="form-label"
        >Confirmation mot de passe</label
      >
      <input
        v-model="password"
        type="password"
        class="form-control"
        id="exampleInputPassword1"
      />
    </div>
    <button class="btn btn-primary" v-if="!modif" @click="modif = !modif">
      Modifier mon compte
    </button>
    <button class="btn btn-primary" v-if="modif" @click="validModif">
      Confirmer
    </button>
    <p v-if="modifOK">Vos modifications ont bien étaient prises en compte.</p>
  </div>
</template>

<script>
export default {
  name: "AppAccount",
  data() {
    return {
      name: "nom",
      email: "mail",
      password: "mdp",
      modif: false,
      modifOK: false,
    };
  },
  mounted() {
      if(localStorage.token){
        this.user = localStorage.user;
        this.token = localStorage.token;
      } 
    },
  methods: {
    validModif() {
      this.modifOK = !this.modifOK;
      this.modif = !this.modif;
    },
  },
};
</script>
