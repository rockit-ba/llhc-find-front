import Vue from 'vue'
import VueRouter from 'vue-router'

const Main = () => import('components/Main.vue')
const Release = () => import('components/Release.vue')
const Own = () => import('components/Own.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/main',
  },
  {
    path: '/main',
    component: Main
  },
  {
    path: '/release',
    component: Release
  },
  {
    path: '/own',
    component: Own
  },
  
]

//解决Navigating to current location ("/list") is not allowed问题
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}


const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
