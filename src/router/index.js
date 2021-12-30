import {createRouter, createWebHashHistory} from 'vue-router'
import store from '@/store'
import NProgress from '@/utils/nprogress'

let modules = []

const routes = modules


const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 路由跳转前
router.beforeEach((to, _from, next) => {
  NProgress.start();
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