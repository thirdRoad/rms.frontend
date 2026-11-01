import { createRouter, createWebHistory } from 'vue-router'
import { authService } from '@/services/auth'

import HomeView from '@/views/home/HomeView.vue'
import TablesView from '@/views/table/TablesView.vue'
import TableDetailView from '@/views/table/TableDetailView.vue'
import ProductsView from '@/views/product/ProductsView.vue'
import ProductDetailView from '@/views/product/ProductDetailView.vue'
import KitchenView from '@/views/kitchen/KitchenView.vue'
import ModerationView from '@/views/moderation/ModerationView.vue'
import UsersView from '@/views/moderation/UsersView.vue'
import UserDetailView from '@/views/moderation/UserDetailView.vue'
import EmptyView from '@/views/common/EmptyView.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		// Auth
		{
			path: '/login',
			name: 'login',
			component: () => import('@/views/auth/LoginView.vue'),
			meta: { guestOnly: true },
		},
		{
			path: '/logout',
			name: 'logout',
			beforeEnter: async () => {
				await authService.logout()
				return { name: 'login' }
			},
		},

		// Home
		{
			path: '/',
			name: 'home',
			component: HomeView,
			meta: { requiresAuth: true, showAppNavbar: true },
		},

		// Tables
		{
			path: '/tables',
			name: 'tables',
			component: TablesView,
			meta: { requiresAuth: true, showAppNavbar: true },
		},
		{
			path: '/tables/:id',
			name: 'table-detail',
			component: TableDetailView,
			meta: { requiresAuth: true, showAppNavbar: true },
		},

		// Products
		{
			path: '/products',
			name: 'products',
			component: ProductsView,
			meta: { requiresAuth: true, showAppNavbar: true },
		},
		{
			path: '/products/:id',
			name: 'product-detail',
			component: ProductDetailView,
			meta: { requiresAuth: true, showAppNavbar: true },
		},

		// Kitchen
		{
			path: '/kitchen',
			name: 'kitchen',
			component: KitchenView,
			meta: { requiresAuth: true, showAppNavbar: true },
		},

		// Moderation
		{
			path: '/moderation',
			name: 'moderation',
			component: ModerationView,
			meta: { requiresAuth: true, showAppNavbar: true },
		},
		{
			path: '/moderation/users',
			name: 'users',
			component: UsersView,
			meta: { requiresAuth: true, showAppNavbar: true },
		},
		{
			path: '/moderation/users/:id',
			name: 'user-detail',
			component: UserDetailView,
			meta: { requiresAuth: true, showAppNavbar: true },
		},

		// Cash
		{
			path: '/cash',
			name: 'cash',
			component: EmptyView,
			meta: { requiresAuth: true, showAppNavbar: true },
		},

		// Fallback: keep this last
		{
			path: '/:pathMatch(.*)*',
			redirect: { name: 'home' },
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
