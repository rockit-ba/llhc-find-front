import Vue from 'vue'
import VueRouter from 'vue-router'




const Login = () => import('components/Login.vue')
const Register = () => import('components/Register.vue')
const All = () => import('components/All.vue')
const Main = () => import('components/Main.vue')
const Campus = () => import('components/Campus.vue')
const Own = () => import('components/Own.vue')
const Setting = () => import('components/Setting.vue')

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
          title: 'main',
          keepAlive: true,
        }
      },
      {
        path: 'campus',
        name: 'campus',
        component: Campus
      },
      {
        path: 'own',
        name: 'own',
        component: Own,
        meta: {
          title: 'own',
          keepAlive: true,
        }
      },
      {
        path: 'setting',
        name: 'setting',
        component: Setting
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

export default router
