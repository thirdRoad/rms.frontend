import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import { authService } from '@/services/auth'
import EmptyView from '@/views/EmptyView.vue'
import ProductsView from '@/views/ProductsView.vue'
import AddCategoryView from '@/views/AddCategoryView.vue'
import AddProductView from '@/views/AddProductView.vue'
import ProductDetailView from '@/views/ProductDetailView.vue'
import ProductEditView from '@/views/ProductEditView.vue'
import KitchenView from '@/views/KitchenView.vue'
import TablesView from '@/views/TablesView.vue'

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
			component: ProductsView,
			meta: { requiresAuth: true, showAppNavbar: true },
		},
		{
			path: '/tables',
			name: 'tables',
			component: TablesView,
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
			component: KitchenView,
			meta: { requiresAuth: true, showAppNavbar: true },
		},
		{
			path: '/categories/add',
			name: 'add-category',
			component: AddCategoryView,
			meta: { requiresAuth: true, showAppNavbar: true },
		},
		{
			path: '/products/add',
			name: 'add-product',
			component: AddProductView,
			meta: { requiresAuth: true, showAppNavbar: true },
		},
		{
			path: '/products/:id',
			name: 'product-detail',
			component: ProductDetailView,
			meta: { requiresAuth: true, showAppNavbar: true },
		},
		{
			path: '/products/edit/:id',
			name: 'product-edit',
			component: ProductEditView,
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
