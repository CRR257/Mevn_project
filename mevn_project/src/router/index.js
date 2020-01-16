import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Data from '../views/Data.vue';
import store from '../store/index';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    // component: () => import('../views/Login.vue')
    component: Login
  },
  {
    path: '/data',
    name: 'data',
    // component: () => import('../views/Data.vue')
    component: Data
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
// const router = new VueRouter({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   routes
// })

export default router;
