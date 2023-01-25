import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/puzzle',
    name: 'PuzzlePage',
    component: () => import('@/views/PuzzlePage.vue')
  },
  {
    path: '/',
    name: 'HomePage',
    component: () => import('@/views/HomePage.vue')
  }
]

const router = createRouter({
  history: createWebHistory("/"),
  routes,
})

// Path: src\main.ts

export default router
