<template>
    <form class="container w-50 my-5" @submit.prevent="handleSubmit">
        <h1 class="mb-5 border-bottom pb-2">Créer un nouvel événement</h1>
        <div class="mb-3">
            <label for="titre" class="form-label">Titre</label>
            <input v-model="titre" type="text" class="form-control" id="titre" name="titre" />
        </div>
        <div class="mb-3">
            <label for="login" class="form-label">Description</label>
            <input v-model="description" type="text" class="form-control" id="description" name="description" />
        </div>
        <div class="mb-3">
            <label for="pwd" class="form-label">Date</label>
            <input v-model="date_RV" type="datetime-local" class="form-control" id="date_RV" />
        </div>
        <div class="mb-3">
            <label for="conf_pwd" class="form-label">Lieu</label>
            <input v-model="geoloc" type="text" class="form-control" id="geoloc" />
        </div>
        <div class="my-5">
            <button type="submit" class="btn btn-primary me-2">Créer l'événénement</button>
            <a href="javascript:void(0)" @click="handleClick" class="btn btn-outline-secondary">Annuler</a>
        </div>
    </form>
</template>

<script>
//import axios from 'axios';
export default {
    name: 'NewEvent',
    data() {
        return {
            titre: '',
            description: '',
            date_RV: '',
            geoloc: ''
        };
    },
    methods: {
        /*
        async handleSubmit() {
            axios
                .post('http://localhost:8081/auth/signup', {
                    login: this.login,
                    email: this.email,
                    pwd: this.pwd,
                    conf_pwd: this.conf_pwd
                })
                .then((response) => {
                    this.infos = response;
                    console.log(response);
                    if (response) {
                        this.$router.push('/events');
                    } else {
                        return null;
                    }
                })
                .catch((error) => {
                    console.log(error);
                    this.errored = true;
                });
            this.$router.push('/login');
        },
        */
        handleClick() {
            this.$router.push('/events');
        }
    }
};
</script>
