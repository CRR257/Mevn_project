import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import store from '../store/index';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/data',
    name: 'data',
    component: () => import('../views/Data.vue')
  }
]
});

router.beforeEach((to, from, next) => {
  const protectedRoute = to.matched.some(record => record.meta.requireAuth);

  if(protectedRoute && store.state.token === ''){
    console.log(store.state.token);
    next({name: 'login'})

  }else{
    next()
  }

})

export default router;
