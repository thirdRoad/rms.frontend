<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { productService } from '@/services/product'
import { categoryService } from '@/services/category'
import ProductCard from '@/components/product/ProductCard.vue'
import CategoryFilter from '@/components/category/CategoryFilter.vue'
import CreateProductModal from '@/components/product/CreateProductModal.vue'
import CreateCategoryModal from '@/components/category/CreateCategoryModal.vue'

const products = ref([])
const categories = ref([])

const showProductModal = ref(false)
const showCategoryModal = ref(false)
const isCreating = ref(false)

const fetchProducts = async () => {
	products.value = await productService.getProductList()
}

const fetchCategories = async () => {
	categories.value = await categoryService.getCategoryList()
}

const createProduct = async (data) => {
	isCreating.value = true

	try {
		await productService.createProduct(data)
		await fetchProducts()
		showProductModal.value = false
	} catch (error) {
		console.error(error)
	} finally {
		isCreating.value = false
	}
}

const createCategory = async (data) => {
	isCreating.value = true

	try {
		await categoryService.createCategory(data)
		await fetchCategories()
		showCategoryModal.value = false
	} catch (error) {
		console.error(error)
	} finally {
		isCreating.value = false
	}
}

onMounted(() => {
	fetchProducts()
	fetchCategories()
})
</script>

<template>
	<div class="products-container">
		<div class="products-wrapper">
			<div class="page-header">
				<div class="header-titles">
					<h1>Products</h1>
					<p>Manage your menu items and product list</p>
				</div>

				<div class="actions">
					<button class="action-btn" @click="showProductModal = true">Add Product</button>
					<button class="action-btn secondary" @click="showCategoryModal = true">
						Add Category
					</button>
				</div>
			</div>

			<div class="content-layout">
				<aside class="sidebar-section">
					<CategoryFilter :categories="categories" />
				</aside>

				<main class="products-scroll-area">
					<div class="products-grid">
						<RouterLink
							v-for="product in products"
							:key="product.id"
							:to="{ name: 'product-detail', params: { id: product.id } }"
							class="product-card-link"
						>
							<ProductCard :product="product" />
						</RouterLink>
					</div>
				</main>
			</div>
		</div>

		<CreateProductModal
			:show="showProductModal"
			:loading="isCreating"
			:categories="categories"
			@submit="createProduct"
			@close="showProductModal = false"
		/>

		<CreateCategoryModal
			:show="showCategoryModal"
			:loading="isCreating"
			@submit="createCategory"
			@close="showCategoryModal = false"
		/>
	</div>
</template>

<style scoped>
.products-container {
	min-height: calc(100vh - 70px);
	display: flex;
	justify-content: center;
	padding: 2.5rem 1.5rem;
	background-color: #f9fafb;
	box-sizing: border-box;
}

.products-wrapper {
	width: 100%;
	max-width: 1200px;
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
}

.page-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-wrap: wrap;
	gap: 1rem;
}

.header-titles h1 {
	font-size: 2rem;
	font-weight: 700;
	color: #111827;
	margin: 0;
	letter-spacing: -0.025em;
}

.header-titles p {
	font-size: 0.95rem;
	color: #6b7280;
	margin-top: 0.4rem;
}

.actions {
	display: flex;
	align-items: center;
	gap: 10px;
}

.action-btn {
	padding: 0.7rem 1.25rem;
	border: none;
	border-radius: 8px;
	background-color: #e11d48;
	color: white;
	cursor: pointer;
	font-weight: 600;
	font-size: 0.9rem;
	transition:
		background-color 0.2s ease,
		transform 0.1s ease;
}

.action-btn:hover {
	background-color: #be123c;
}

.action-btn:active {
	transform: scale(0.98);
}

.action-btn.secondary {
	background-color: #ffffff;
	color: #374151;
	border: 1.5px solid #e5e7eb;
}

.action-btn.secondary:hover {
	background-color: #f3f4f6;
	border-color: #d1d5db;
}

/* Two-column layout: Sidebar on left, products grid on right */
.content-layout {
	display: flex;
	gap: 2rem;
	align-items: flex-start;
}

.sidebar-section {
	flex-shrink: 0;
}

/* Scrollable area for products */
.products-scroll-area {
	flex: 1;
	max-height: calc(100vh - 220px);
	overflow-y: auto;
	padding-right: 6px;
	padding-bottom: 1rem;
}

/* Modern scrollbar styling */
.products-scroll-area::-webkit-scrollbar {
	width: 6px;
}

.products-scroll-area::-webkit-scrollbar-track {
	background: #f1f5f9;
	border-radius: 4px;
}

.products-scroll-area::-webkit-scrollbar-thumb {
	background: #cbd5e1;
	border-radius: 4px;
}

.products-scroll-area::-webkit-scrollbar-thumb:hover {
	background: #94a3b8;
}

/* Responsive Grid layout for cards */
.products-grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
	gap: 1.25rem;
}

.product-card-link {
	text-decoration: none;
	color: inherit;
	display: block;
	border-radius: 12px;
	transition: transform 0.2s ease;
}

/* Responsive adjustment for tablet/mobile */
@media (max-width: 768px) {
	.content-layout {
		flex-direction: column;
	}

	.sidebar-section {
		width: 100%;
	}

	.products-scroll-area {
		width: 100%;
		max-height: none;
	}
}
</style>
