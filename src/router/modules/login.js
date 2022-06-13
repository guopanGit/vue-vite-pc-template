const route = [
  {
    path: '/404',
    name: "404",
    component: () => import('@/views/default/404.vue'),
    meta: {hideMenu: true, hideTopBar: true}
  },
  {
    path: '/401',
    name: "401",
    component: () => import('@/views/default/401.vue'),
    meta: {hideMenu: true, hideTopBar: true}
  },
  {
    path: '/login',
    name: "login",
    component: () => import('@/views/login/login.vue'),
    meta: {title: '登录', hideMenu: true, hideTopBar: true}
  },
  {
    // 找不到路由重定向到404页面
    path: "/:pathMatch(.*)",
    redirect: "/404",
  },
]

export default route