import {createRouter, createWebHashHistory} from "vue-router";
import store from "@/store";
import NProgress from "@/utils/nprogress";

// 引入modules
import login from "./modules/login";
import repertory from "./modules/repertory";
import account from "./modules/account";
import home from "./modules/home";

let modules = [
  ...login,
];

const routes = modules;

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

// 登录后更新路由目录
let asyncRoutes = [
  ...home,
  ...repertory,
  ...account
];

// 登录后添加路由
export function addRoutes() {
  asyncRoutes.forEach(item => {
    modules.push(item);
    router.addRoute(item);
  });
}
// 刷新页面载入路由
if (store.state.user.info.name) {
  addRoutes()
}

export function removeAccount() {
  location.reload();
}


// 路由跳转前
router.beforeEach((to, _from, next) => {
  NProgress.start();
  // 未登录跳转到登录页面 token未获取
  let token = store.state.user.token;
  if (to.path === "/login") {
    next();
    store.dispatch("user/setPath", to.path);
  } else {
    if (token !== "") {
      store.dispatch("user/setPath", to.path);
      next();
    } else {
      next("/login");
    }
  }


});
// 路由跳转完成
router.afterEach((to, _from) => {
  NProgress.done();
});

export {
  modules
};


export default router;
