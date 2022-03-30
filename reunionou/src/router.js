import { createWebHistory, createRouter } from 'vue-router';
import AppHome from './components/AppHome.vue';
import AppLogin from './components/AppLogin.vue';
import AppRegister from './components/AppRegister.vue';
import AppEvents from './components/AppEvents.vue';
import AppAccount from './components/AppAccount.vue';
import AppNewEvent from './components/AppNewEvent.vue';
import AppEventDetail from './components/AppEventDetail.vue';
import AppAccountPassword from './components/AppAccountPassword.vue'
import AppInvitations from './components/AppInvitations.vue'
import AppFAQ from './components/AppFAQ.vue';
import AppNotFound from './components/_partials/AppNotFound.vue';

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
        path: '/register',
        name: 'Register',
        component: AppRegister
    },
    {
        path: '/events',
        name: 'Events',
        component: AppEvents
    },
    {
        path: '/invitations',
        name: 'Invitations',
        component: AppInvitations
    },
    {
        path: '/account',
        name: 'Account',
        component: AppAccount
    },
    {
        path: '/account/password',
        name: 'AccountPassword',
        component: AppAccountPassword
    },
    {
        path: '/new_event',
        name: 'NewEvent',
        component: AppNewEvent
    },
    {
        path: '/events/:id',
        name: 'EventDetail',
        component: AppEventDetail
    },
    {
        path: '/faq',
        name: 'FAQ',
        component: AppFAQ
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
