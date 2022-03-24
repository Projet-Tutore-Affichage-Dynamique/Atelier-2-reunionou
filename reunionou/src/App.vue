<template>
  <div id="app">
    <AppNav />
    <div class="p-5">
    <router-view />
    </div>
  </div>
</template>

<script>
import AppNav from './components/_partials/AppNav.vue'

export default {
  name: 'App',
    components: {
      AppNav
    },
    data() {
        return {
            token: null
        }
    },
}
</script>
