import { createWebHistory, createRouter } from "vue-router";
import AppHome from "./components/AppHome.vue";
import AppLogin from "./components/AppLogin.vue";
import AppRegister from "./components/AppRegister.vue";
import AppEvents from "./components/AppEvents.vue";
import AppAccount from "./components/AppAccount.vue";
import AppNotFound from "./components/_partials/AppNotFound.vue";

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
  {
    path: "/events",
    name: "Events",
    component: AppEvents,
  },
  {
    path: "/account",
    name: "Account",
    component: AppAccount,
  },
  {
    path: '/:pathMatch(.*)*',
    name: "NotFound",
    component: AppNotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
