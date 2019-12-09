import Vue from 'vue'
import VueRouter from 'vue-router'


const Login = () => import('components/Login.vue')
const Register = () => import('components/Register.vue')
const All = () => import('components/All.vue')
const Main = () => import('components/Main.vue')
const Black = () => import('components/Black.vue')
const Campus = () => import('components/Campus.vue')
const Comment = () => import('views/campus/Comment.vue')
const Own = () => import('components/Own.vue')
const Message = () => import('views/own/Message.vue')
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
      },
      {
        path: 'campus',
        name: 'campus',
        component: Campus,
        meta: {
          keepAlive: false, //
        }
      },
      {
        path: 'own',
        name: 'own',
        component: Own,
        meta: {
          keepAlive: false, //
        }
      },
      {
        path: 'setting',
        name: 'setting',
        component: Setting,
        meta: {
          keepAlive: false, //
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
    component: Comment,
    meta: {
      keepAlive: false, //
    }
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
      {
        path: 'message',
        name: 'message',
        component: Message
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


router.beforeEach((to, from, next) => {
  //从底部栏中任意其他一个进入校园页面就刷新
  if ((from.name == 'main' && to.name == 'campus') || (from.name == 'own' && to.name == 'campus') || (from.name == 'setting' && to.name == 'campus') || (from.name == 'black' && to.name == 'campus')) {
      to.meta.keepAlive = true;
  //从评论回到校园不刷新
  }else if(from.name == 'comment' && to.name == 'campus'){
    to.meta.keepAlive = true;}
  //从评论回到自己的动态不刷新
  else if(from.name == 'comment' && to.name == 'own'){
    to.meta.keepAlive = true;
  //从main campus setting 我的消息主页回到我的主页刷新
  }else if((from.name == 'message' && to.name == 'own') || (from.name == 'main' && to.name == 'own') || (from.name == 'campus' && to.name == 'own') || (from.name == 'settinf' && to.name == 'own')){
    to.meta.keepAlive = false;
  }

  next();
  
})

export default router
