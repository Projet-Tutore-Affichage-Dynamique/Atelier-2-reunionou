import { createWebHistory, createRouter } from "vue-router";
import AppHome from "./components/AppHome.vue";
import AppLogin from "./components/AppLogin.vue";
import AppRegister from "./components/AppRegister.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: AppHome,
  },
  {
    path: "/login",
    name: "Login",
    component: AppLogin,
  },
  {
    path: "/register",
    name: "Register",
    component: AppRegister,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
