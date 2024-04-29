import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UsersView from '../views/UsersView.vue'
import UserRegister from '../views/UserRegister.vue'
import EditUser from '../views/EditUser.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },{
    path: '/Usuarios',
    name: 'usuarios',
    component: UsersView
  },{
    path: '/ReguistrarUsuario',
    name: 'reguistrarUsuario',
    component: UserRegister
  },
  {
    path: '/EditarUsuario',
    name: 'editarUsuario',
    component: EditUser
  }
]

const router = new VueRouter({
  routes
})

export default router
