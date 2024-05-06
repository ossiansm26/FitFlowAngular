import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UsersView from '../views/UsersView.vue'
import UserRegister from '../views/UserRegister.vue'
import EditUser from '../views/EditUser.vue'
import MaterialView from '@/views/MaterialView.vue'
import EditMaterial from '@/views/EditMaterial.vue'
import CreateMaterial from '@/views/CreateMaterial.vue'
import MuscleGroupView from '@/views/MuscleGroupView.vue'
import CreateMuscleGroup from '@/views/CreateMuscleGroup.vue'
import ExercicesView from '@/views/ExercicesView.vue'
import ExercicesCollectionView from '@/views/ExercicesCollectionView.vue'
import RoutinesView from '@/views/RoutinesView.vue'
import UserDetails from '@/views/UserDetails.vue'
import PostView from '@/views/PostView.vue'
import CommunityView from '@/views/CommunityView.vue'
import AchivementView from '@/views/AchivementView.vue'

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
  },
  {
    path: '/userDetails',
      name: 'UserDetails',
      component: UserDetails,
      props: true,
  }
  ,{
    path: '/ReguistrarUsuario',
    name: 'reguistrarUsuario',
    component: UserRegister
  },
  {
    path: '/EditarUsuario',
    name: 'editarUsuario',
    component: EditUser
  },
  {
    path: '/Material',
    name: 'material',
    component: MaterialView
  },
  {
    path: '/EditMaterial',
    name: 'editMaterial',
    component: EditMaterial
  },
  {
    path: '/CrearMaterial',
    name: 'crearMaterial',
    component: CreateMaterial
  },
  {
    path: '/MuscleGroup',
    name: 'muscleGroup',
    component: MuscleGroupView
  },
  {
    path: '/CreateMuscleGroup',
    name: 'createMuscleGroup',
    component: CreateMuscleGroup
  },
  {
    path: '/Exercices',
    name: 'exercices',
    component: ExercicesView

  },
  {
    path: '/ExercicesCollection',
    name: 'exercicesCollection',
    component: ExercicesCollectionView
  },
  {
    path: '/Routine',
    name: 'routine',
    component: RoutinesView
  },
  {
    path: '/Post',
    name: 'post',
    component: PostView
  },
  {
    path: '/Community',
    name: 'community',
    component: CommunityView
  },
  {
    path: '/Achievement',
    name: 'achievement',
    component: AchivementView
  }
]

const router = new VueRouter({
  routes
})

export default router
