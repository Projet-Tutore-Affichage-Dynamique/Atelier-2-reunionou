<template>
  <div id="app">
    <AppNav :user="user"/>
    <div class="p-5">
    <router-view :user="user"/>
    </div>
  </div>
</template>

<script>
import AppNav from './components/_partials/AppNav.vue'
import axios from 'axios'

export default {
  name: 'App',
    components: {
      AppNav
    },
    data() {
        return {
            user: null
        }
    },
    async created() {
        const response = await axios.get('user')
        this.user = response.data
    }
}
</script>
