import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/component/HomePage.vue";
import Signin from "@/component/SignIn.vue";
import Signup from "@/component/SignUp.vue";

const routes = [
  {
    name: "Home",
    path: "/",
    component: HomePage,
  },
  {
    name: "Signin",
    path: "/Signin",
    component: Signin,
  },
  {
    name: "signup",
    path: "/signup",
    component: Signup,
  },
];

const router = createRouter({ history: createWebHistory(), routes });

export default router;
