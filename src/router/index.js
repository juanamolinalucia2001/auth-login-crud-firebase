import Vue from 'vue'
import VueRouter from 'vue-router'

import {auth} from '../firebase'

Vue.use(VueRouter)

const routes = [
 
  {
    path: '/',
    name: 'inicio',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Inicio.vue'),
    meta: { requireAuth: true}
  },
  {
    path: '/editar/:id',
    name: 'Editar',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "editar" */ '../views/Editar.vue')
  },
  {
    path: '/agregar',
    name: 'Agregar',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "agregar" */ '../views/Agregar.vue')
  },
  {
    path: '/registro',
    name: 'Registro',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "agregar" */ '../views/Registro.vue')
  },
  {
    path: '/acceso',
    name: 'Acceso',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "agregar" */ '../views/Acceso.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next)=>{
  //pregunto si existe el meta requireAuth
  if(to.matched.some(record => record.meta.requireAuth)){
    //pregunto si existe el usuario
    const usuario = auth.currentUser
    console.log('usuario desde router', usuario)

    if(!usuario){
      next({path:'/acceso'})
    }
    next()

  }else{
    next()
  }
})

export default router
