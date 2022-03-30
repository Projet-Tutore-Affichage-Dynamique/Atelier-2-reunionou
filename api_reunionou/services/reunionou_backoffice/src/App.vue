<template>
  <div id="app">
    <AppNav ref="nav"/>
    <router-view />
  </div>
</template>

<script>
import AppNav from "./components/_partials/AppNav.vue";
export default {
  name: "App",
  components: {
    AppNav,
  },

  methods: {
    refresh_Nav(){
      this.$refs.nav.$forceUpdate;
    }
  }
};
</script>
<style>
@import './components/_partials/style.css';
</style>
