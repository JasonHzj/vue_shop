import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/home.vue'
import Welcome from '../components/welcome.vue'
import Users from '../components/user/Users.vue'
import hpold from '../components/hp/hpold.vue'
import zba from '../components/hp/zba.vue'
import Roles from '../components/mk/Roles.vue'
import params from '../components/mk/params.vue'
import lpold from '../components/LP/lpold.vue'
import lpph from '../components/LP/lpph.vue'
import reports from '../components/hd/reports.vue'
import dailyData from '../components/tb/dailydata.vue'
import dictionaryData from '../components/tb/dictionaryData.vue'
import zbdate from '../components/hd/zbdate.vue'
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      { path: '/welcome', component: Welcome },
      { path: '/users', component: Users },
      { path: '/roles', component: Roles },
      { path: '/hpold', component: hpold },
      { path: '/lpold', component: lpold },
      { path: '/zba', component: zba },
      { path: '/params', component: params },
      { path: '/lpph', component: lpph },
      { path: '/reports', component: reports },
      { path: '/dailydata', component: dailyData },
      {
        path: '/dictionaryData',
        component: dictionaryData
      },
      {
        path: '/zbdate',
        component: zbdate
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径而来
  // next() 放行  next('/login') 强制跳转
  if (to.path === '/login') return next()
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
