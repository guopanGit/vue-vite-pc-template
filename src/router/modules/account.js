import Layout from "@/Layout/index.vue";

const route = [

  {
    path: '/account',
    name: "account",
    component: Layout,
    showPath: true,
    redirect: '/account/index',
    meta: {title: '用户管理', icon: 'icon-yonghu'},
    children: [
      {
        path: 'index',
        name: "account",
        component: () => import('@/views/account/account.vue'),
        meta: {title: '用户管理', path: '/account/index'}
      }
    ]
  }
]

export default route