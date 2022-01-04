const route = [
  {
    path: '/',
    name: "/",
    redirect: "/home",
  },
  {
    path: '/home',
    name: "home",
    showPath: true,
    component: () => import('@/views/home/home.vue'),
    meta: {title: '首页', hideMenu: false,}
  }
]

export default route