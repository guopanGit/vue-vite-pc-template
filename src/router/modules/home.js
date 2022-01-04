const route = [
  {
    path: '/',
    name: "/",
    redirect: "/home",
  },
  {
    path: '/home',
    name: "home",
    hideMenu: true,
    component: () => import('@/views/home/home.vue'),
    meta: {title: '首页', hideTabs: true},
  }
]

export default route