import Vue from 'vue'
import VueRouter from 'vue-router'
import {getUser} from "common/auth"

const Login = () => import('components/Login.vue')
const Register = () => import('components/Register.vue')
const All = () => import('components/All.vue')
const Main = () => import('components/Main.vue')
const Black = () => import('components/Black.vue')
const Campus = () => import('components/Campus.vue')
const Comment = () => import('views/campus/Comment.vue')
const Own = () => import('components/Own.vue')
const Setting = () => import('components/Setting.vue')
const Container = () => import('components/Container.vue')
const Info = () => import('views/setting/Info.vue')
const Photos = () => import('views/setting/Photos.vue')
const Privacy = () => import('views/setting/Privacy.vue')
const FeedBack = () => import('views/setting/FeedBack.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/all/main',
  },
  {
    path: '/all',
    name: 'all',
    component: All,
    children: [
      {
        path: 'main',
        name: 'main',
        component: Main,
        meta: {
          keepAlive: false, 
        }
      },
      {
        path: 'campus',
        name: 'campus',
        component: Campus,
        meta: {
          keepAlive: true, 
        }
      },
      {
        path: 'own',
        name: 'own',
        component: Own,
        meta: {
          keepAlive: false, 
        }
      },
      {
        path: 'setting',
        name: 'setting',
        component: Setting,
        meta: {
          keepAlive: false, 
        }
      },
      {
        path: 'black',
        name: 'black',
        component: Black,
      },

    ],
    
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/comment',
    name: 'comment',
    component: Comment
  },
  {
    path: '/container',
    name: 'container',
    component: Container,
    children: [
      {
        path: 'info',
        name: 'info',
        component: Info
      },
      {
        path: 'photos',
        name: 'photos',
        component: Photos
      },
      {
        path: 'privacy',
        name: 'privacy',
        component: Privacy
      },
      {
        path: 'feedBack',
        name: 'feedBack',
        component: FeedBack
      },
    ]
  },
  
]

//解决Navigating to current location ("/list") is not allowed问题
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}


const router = new VueRouter({
  mode: 'history',
  routes,

})

// router.beforeEach((to,from,next) => {
//   console.log(to)
//   if(to.fullPath == '/all/own' || to.fullPath == '/all/setting' ){
//     if(getUser().id == undefined){
//       router.push('/login')
//     }
//   }
//   next()
// })

export default router
