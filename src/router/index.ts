import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    // 动态引入
    component: () => import('../views/HomeView.vue'),
    children: [
      {
        path: 'goods',
        name: 'good',
        // 设置元信息，为了做动态路由，增加一个是否展示菜单的字段
        meta: {
          show: true
        },
        component: () => import('../views/GoodView.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    // 动态引入
    component: () => import('../views/LoginView.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
