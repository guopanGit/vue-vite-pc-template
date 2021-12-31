const route = [
  {
    path: '/404',
    name: "default",
    component: () => import('@/views/default/404.vue'),
    meta: {hideTabs: true}
  },
  {
    path: '/401',
    name: "default",
    component: () => import('@/views/default/4041.vue'),
    meta: {hideTabs: true}
  },
  {
    path: '/login',
    name: "login",
    component: () => import('@/views/login/login.vue'),
    hideMenu: true,
    meta: {title: '登录', hideTabs: true}
  },
  {
    // 找不到路由重定向到404页面
    path: "/:pathMatch(.*)",
    redirect: "/404",
    meta: {hideTabs: true}
  },
]

export default route