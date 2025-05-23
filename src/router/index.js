import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AutoresView from '../views/AutoresView.vue'
import LibrosView from '../views/LibrosView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/autores',
      name: 'autores',
      component: AutoresView,
    },
    {
      path: '/libros',
      name: 'libros',
      component: LibrosView,
    },
  ],
})

export default router
