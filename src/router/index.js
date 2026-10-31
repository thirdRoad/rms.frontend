import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import { authService } from '@/services/auth'
import EmptyView from '@/views/EmptyView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true, showAppNavbar: true },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
      meta: { guestOnly: true },
    },
    {
      path: '/products',
      name: 'products',
      component: EmptyView,
      meta: { requiresAuth: true, showAppNavbar: true },
    },
    {
      path: '/tables',
      name: 'tables',
      component: EmptyView,
      meta: { requiresAuth: true, showAppNavbar: true },
    },
    {
      path: '/cash',
      name: 'cash',
      component: EmptyView,
      meta: { requiresAuth: true, showAppNavbar: true },
    },
    {
      path: '/modaration',
      name: 'modaration',
      component: EmptyView,
      meta: { requiresAuth: true, showAppNavbar: true },
    },
    {
      path: '/kitchen',
      name: 'kitchen',
      component: EmptyView,
      meta: { requiresAuth: true, showAppNavbar: true },
    },
    {
      path: '/logout',
      name: 'logout',
      beforeEnter: async () => {
        try {
          await authService.logout()
        } catch (error) {
          console.error('we have trouble logout', error)
        }
        return { name: 'login' }
      },
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
})

router.beforeEach((to) => {
  const user = localStorage.getItem('access_token')
  const isAuthenticated = Boolean(user)

  if (to.meta.requiresAuth && !isAuthenticated) {
    return { name: 'login' }
  }

  if (to.meta.guestOnly && isAuthenticated) {
    return { name: 'home' }
  }

  return true
})

export default router
