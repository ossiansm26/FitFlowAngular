import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import UsersView from '@/views/user/UsersView.vue'
import UserRegister from '@/views/user/UserRegister.vue'
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
import AchievementView from '@/views/achievements/AchievementView.vue'
import UserLogin from '@/views/user/UserLogin.vue'
import CreateRoutines from '@/views/routines/CreateRoutines.vue'
import RoutinesDetails from '@/views/routines/RoutinesDetails.vue'
import EditRoutine from '@/views/routines/EditRoutine.vue'
import EditCommunity from '@/views/community/EditCommunity.vue'
import CommunityDetails from '@/views/community/CommunityDetails.vue'
import CreateCommunity from '@/views/community/CreateCommunity.vue'
import AchievementDetails from '@/views/achievements/AchievementDetails.vue'
import CreateAchievement from '@/views/achievements/CreateAchievement.vue'
import EditAchievement from '@/views/achievements/EditAchievement.vue'
import EditMuscleGroup from '@/views/muscleGroup/EditMuscleGroup.vue'
import MuscleGroupDetails from '@/views/muscleGroup/MuscleGroupDetails.vue'
import CreateExercice from '@/views/exercice/CreateExercice.vue'
import ExercicesDetails from '@/views/exercice/ExercicesDetails.vue'
import CreateExercicesCollection from '@/views/collectionExercices/CreateExercicesCollection.vue'
import ExercicesLogView from '@/views/exercicesLog/ExercicesLogView.vue'
import ExerciceEdit from '@/views/exercice/ExerciceEdit.vue'
import ExercicesLogCreate from '@/views/exercicesLog/ExercicesLogCreate.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },{
    path: '/',
    name: 'login',
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
    path: '/EditRoutine',
    name: 'editRoutine',
    component: EditRoutine
  },
  {
    path: '/CreateMuscleGroup',
    name: 'createMuscleGroup',
    component: CreateMuscleGroup
  },
  {
    path: '/EditMuscleGroup',
    name: 'editMuscleGroup',
    component: EditMuscleGroup
  },
  {
    path: '/MusleGroupDetails',
    name: 'muscleGroupDetails',
    component: MuscleGroupDetails
  },
  {
    path: '/Exercices',
    name: 'exercices',
    component: ExercicesView
  },
  {
    path: '/ExercicesDetails',
    name: 'exercicesDetails',
    component: ExercicesDetails
  },
  {
    path: '/ExerciceEdit',
    name: 'exerciceEdit',
    component: ExerciceEdit
  },
  {
    path: '/CreateExercice',
    name: 'createExercice',
    component: CreateExercice
  },
  {
    path: '/ExercicesCollection',
    name: 'exercicesCollection',
    component: ExercicesCollectionView
  },
  {
    path: '/CreateExercicesCollection',
    name: 'createExercicesCollection',
    component:CreateExercicesCollection
  },
  {
    path: '/Routine',
    name: 'routine',
    component: RoutinesView
  },{
    path: '/RouterDetails',
    name: 'routerDetails',
    component: RoutinesDetails
  
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
    path: '/EditCommunity',
    name: 'editCommunity',
    component: EditCommunity
  },
  {
    path: '/CommunityDetails',
    name: 'communityDetails',
    component: CommunityDetails
  
  },
  {
    path: '/CommunityCreate',
    name: 'communityCreate',
    component: CreateCommunity
  
  
  },
  {
    path: '/Achievement',
    name: 'achievement',
    component: AchievementView
  },
  {
    path: '/AchievementDetails',
    name: 'achievementDetails',
    component: AchievementDetails
  },
  {
    path: '/CreateAchievement',
    name: 'createAchievement',
    component: CreateAchievement
  },
  {
    path: '/EditAchievement',
    name: 'editAchievement',
    component: EditAchievement
  },
  {
    path: '/ExercicesLogView',
    name: 'exercicesLogView',
    component: ExercicesLogView
  },
  {
    path: '/ExercicesLogCreate',
    name: 'exercicesLogCreate',
    component: ExercicesLogCreate
  }
]

const router = new VueRouter({
  routes
})

export default router
