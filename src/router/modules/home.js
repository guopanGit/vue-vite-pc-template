import Layout from "@/Layout/index.vue";

const route = [
  {
    path: '/',
    name: "/",
    redirect: "/home",
  },
  {
    path: '/home',
    name: "home",
    component: Layout,
    showPath: true,
    redirect: '/home/index',
    meta: {title: '首页', icon: 'icon-shouye'},
    children: [
      {
        path: 'index',
        name: "home",
        component: () => import('@/views/home/home.vue'),
        meta: {title: '首页', path: '/wms/purchase'}
      }
    ]
  }
]

export default route