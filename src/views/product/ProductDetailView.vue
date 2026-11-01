<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { productService } from '@/services/product'
import ProductDetail from '@/components/product/ProductDetail.vue'
import EditProductModal from '@/components/product/EditProductModal.vue'
import DeleteConfirmModal from '@/components/common/DeleteConfirmModal.vue'

const route = useRoute()
const router = useRouter()

const product = ref(null)
const showEditModal = ref(false)
const isSaving = ref(false)
const showDeleteModal = ref(false)

const fetchProduct = async (id) => {
	try {
		product.value = await productService.getProduct(id)
	} catch (error) {
		console.error(error)
	}
}

const updateProduct = async (data) => {
	isSaving.value = true

	try {
		await productService.updateProduct(route.params.id, data)
		await fetchProduct(route.params.id)
		showEditModal.value = false
	} catch (error) {
		console.error(error)
	} finally {
		isSaving.value = false
	}
}

const deleteProduct = async () => {
	try {
		await productService.deleteProduct(route.params.id)
		showDeleteModal.value = false
		router.push({ name: 'products' })
	} catch (error) {
		console.error(error)
	}
}

watch(
	() => route.params.id,
	(id) => fetchProduct(id),
	{ immediate: true },
)
</script>

<template>
	<div class="product-detail-view">
		<div class="view-wrapper">
			<div class="actions-header">
				<button class="back-btn" @click="router.push({ name: 'products' })">
					← Back to Products
				</button>

				<div v-if="product" class="action-buttons">
					<button class="edit-btn" @click="showEditModal = true">Edit Product</button>
					<button class="delete-btn" @click="showDeleteModal = true">Delete Product</button>
				</div>
			</div>

			<ProductDetail v-if="product" :product="product" />
		</div>

		<EditProductModal
			v-if="product"
			:show="showEditModal"
			:loading="isSaving"
			:product="product"
			@submit="updateProduct"
			@close="showEditModal = false"
		/>

		<DeleteConfirmModal
			:show="showDeleteModal"
			:item-name="product?.name"
			title="Delete Product?"
			@confirm="deleteProduct"
			@cancel="showDeleteModal = false"
		/>
	</div>
</template>

<style scoped>
.product-detail-view {
	min-height: calc(100vh - 70px);
	display: flex;
	justify-content: center;
	padding: 2.5rem 1.5rem;
	background-color: #f9fafb;
	box-sizing: border-box;
}

.view-wrapper {
	width: 100%;
	max-width: 600px;
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
}

.actions-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 1rem;
}

.back-btn {
	background: none;
	border: none;
	color: #4b5563;
	font-weight: 600;
	font-size: 0.95rem;
	cursor: pointer;
	padding: 0.5rem 0;
	transition: color 0.2s ease;
}

.back-btn:hover {
	color: #111827;
}

.action-buttons {
	display: flex;
	gap: 0.75rem;
}

.edit-btn,
.delete-btn {
	padding: 0.6rem 1.2rem;
	border-radius: 8px;
	font-weight: 600;
	font-size: 0.9rem;
	cursor: pointer;
	border: none;
	transition: all 0.2s ease;
}

.edit-btn {
	background-color: #f3f4f6;
	color: #374151;
	border: 1.5px solid #e5e7eb;
}

.edit-btn:hover {
	background-color: #e5e7eb;
	border-color: #d1d5db;
}

.delete-btn {
	background-color: #fef2f2;
	color: #dc2626;
	border: 1.5px solid #fecaca;
}

.delete-btn:hover {
	background-color: #dc2626;
	color: #ffffff;
	border-color: #dc2626;
}
</style>
