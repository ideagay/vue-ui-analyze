import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [{
    path: '/',
    redirect: '/project'
}, {
    path: '/project',
    component: () => import('@/components/project')
}, {
    path: '/material',
    component: () => import('@/components/material')
}, {
    path: '/dependence',
    component: () => import('@/components/dependence')
}];

const router = new VueRouter({
    routes
});

export default router;