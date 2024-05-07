import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UsersView from '../views/user/UsersView.vue'
import UserRegister from '../views/user/UserRegister.vue'
import EditUser from '../views/user/EditUser.vue'
import MaterialView from '@/views/material/MaterialView.vue'
import EditMaterial from '@/views/material/EditMaterial.vue'
import CreateMaterial from '@/views/material/CreateMaterial.vue'
import MuscleGroupView from '@/views/muscleGroup/MuscleGroupView.vue'
import CreateMuscleGroup from '@/views/muscleGroup/CreateMuscleGroup.vue'
import ExercicesView from '@/views/exercice/ExercicesView.vue'
import ExercicesCollectionView from '@/views/collectionExercices/ExercicesCollectionView.vue'
import RoutinesView from '@/views/routines/RoutinesView.vue'
import UserDetails from '@/views/user/UserDetails.vue'
import PostView from '@/views/post/PostView.vue'
import CommunityView from '@/views/community/CommunityView.vue'
import AchivementView from '@/views/achivements/AchivementView.vue'
import UserLogin from '@/views/user/UserLogin.vue'
import CreateRoutines from '@/views/routines/CreateRoutines.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },{
    path: '/',
    name: 'home',
    component: UserLogin
  },
  {
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
  },{
    path: '/CreateRoutine',
    name: 'createRoutine',
    component: CreateRoutines
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
