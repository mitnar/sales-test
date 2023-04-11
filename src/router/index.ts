import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'stock',
      component: () => import('../views/StockView.vue')
    },
    {
      path: '/favorite',
      name: 'favorite',
      component: () => import('../views/FavoriteView.vue')
    },
    {
      path: '/deals',
      name: 'deals',
      component: () => import('../views/DealsView.vue')
    },
  ]
})

export default router
