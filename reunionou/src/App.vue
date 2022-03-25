<template>
  <div id="app">
    <AppNav />
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
};
</script>
<style>
@import './components/_partials/style.css';
</style>
