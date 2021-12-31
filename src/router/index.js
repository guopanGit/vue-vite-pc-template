import {createRouter, createWebHashHistory} from 'vue-router'
import store from '@/store'
import NProgress from '@/utils/nprogress'

// 引入modules
import login from './modules/login'

let modules = [
  ...login
]

const routes = modules


const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 登录后更新路由目录
let asyncRoutes = []

// 登录后添加路由
export function addRoutes() {
  asyncRoutes.forEach(item => {
    modules.push(item)
    router.addRoute(item)
  })
}

// 路由跳转前
router.beforeEach((to, _from, next) => {
  NProgress.start();
  // 未登录跳转到登录页面 token未获取
  if ('token') {
    next()
  } else {
    next('/login')
  }
})
// 路由跳转完成
router.afterEach((to, _from) => {
  NProgress.done();
})

export {
  modules
}


export default router