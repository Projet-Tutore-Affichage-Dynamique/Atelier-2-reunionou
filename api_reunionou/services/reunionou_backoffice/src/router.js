import { createWebHistory, createRouter } from 'vue-router';
import AppHome from './components/AppHome.vue';
import AppLogin from './components/AppLogin.vue';
import AppEvents from './components/AppEvents.vue';
import AppAccount from './components/AppAccount.vue';
import AppNotFound from './components/_partials/AppNotFound.vue';
import AppUsers from './components/AppUsers';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: AppHome
    },
    {
        path: '/login',
        name: 'Login',
        component: AppLogin
    },
    {
        path: '/events',
        name: 'Events',
        component: AppEvents
    },
    {
      path: '/users',
      name: 'Users',
      component: AppUsers
    },
    {
        path: '/account',
        name: 'Account',
        component: AppAccount
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: AppNotFound
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
