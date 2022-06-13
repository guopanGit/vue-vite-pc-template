import Layout from "@/Layout/index.vue";

const route = [

  {
    path: '/repertory',
    name: "repertory",
    component: Layout,
    showPath: true,
    redirect: '/repertory/list/conserve',
    meta: {title: '库存管理', icon: 'icon-kucun'},
    children: [
      {
        path: 'list',
        name: "repertory",
        component: () => import('@/views/repertory/repertory.vue'),
        meta: {title: '库存管理列表', path: '/repertory/index'},
        children: [
          {
            path: 'conserve',
            name: "conserve",
            component: () => import('@/views/repertory/conserve/conserve.vue'),
            meta: {title: '入库列表', path: '/repertory/list/conserve'}
          },
          {
            path: 'export',
            name: "export",
            component: () => import('@/views/repertory/export/export.vue'),
            meta: {title: '出库列表', path: '/repertory/list/export'}
          },
          {
            path: 'check',
            name: "check",
            component: () => import('@/views/repertory/check/check.vue'),
            meta: {title: '库存盘点', path: '/repertory/list/check'}
          },
          {
            path: 'retrospect',
            name: "retrospect",
            component: () => import('@/views/repertory/retrospect/retrospect.vue'),
            meta: {title: '视频追溯', path: '/repertory/list/retrospect'}
          }
        ]
      }
    ]
  }
]

export default route
