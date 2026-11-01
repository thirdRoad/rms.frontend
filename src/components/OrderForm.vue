<script setup>
import { ref, onMounted } from 'vue'
import { productsService } from '@/services/products'
import ProductCard from '@/components/ProductCard.vue'
import SelectedProduct from '@/components/SelectedProduct.vue'

defineProps({
	loading: { type: Boolean, default: false },
})

const emit = defineEmits(['submit', 'cancel'])

const products = ref([])
const selectedProduct = ref(null)
const orderItems = ref([])

onMounted(async () => {
	products.value = await productsService.getProductList()
})

const selectProduct = (product) => {
	selectedProduct.value = product
}

const saveOrderItem = (quantity) => {
	const existingItem = orderItems.value.find((item) => item.product_id === selectedProduct.value.id)

	if (existingItem) {
		existingItem.quantity += quantity
	} else {
		orderItems.value.push({
			product_id: selectedProduct.value.id,
			quantity: quantity,
		})
	}

	selectedProduct.value = null
}

const removeOrderItem = (productId) => {
	orderItems.value = orderItems.value.filter((item) => item.product_id !== productId)
}

const getProductName = (productId) => {
	return products.value.find((product) => product.id === productId)?.name
}

const onSubmit = () => {
	emit('submit', orderItems.value)
}
</script>

<template>
	<div class="order-form">
		<div class="order-container">
			<!-- Left: quantity form for the clicked product -->
			<div class="selected-product-section">
				<SelectedProduct v-if="selectedProduct" :product="selectedProduct" @save="saveOrderItem" />
				<div v-else class="select-prompt">
					<h3>Select a Product</h3>
					<p>Click on any product from the menu to specify quantity and add it to the order.</p>
				</div>
			</div>

			<!-- Right: menu -->
			<div class="product-list-section">
				<h3 class="section-title">Menu Items</h3>
				<div class="products-grid">
					<ProductCard
						v-for="product in products"
						:key="product.id"
						:product="product"
						@click="selectProduct(product)"
					/>
				</div>
			</div>
		</div>

		<!-- Bottom: order summary -->
		<div class="order-items-card">
			<h2>Order Summary</h2>

			<div v-if="orderItems.length === 0" class="empty-order">
				<p>No items added to this order yet.</p>
			</div>

			<div v-else class="order-list">
				<div v-for="item in orderItems" :key="item.product_id" class="order-item">
					<span class="item-name">{{ getProductName(item.product_id) }}</span>
					<span class="item-qty">
						Quantity: <strong>{{ item.quantity }}</strong>
					</span>
					<button class="remove-btn" @click="removeOrderItem(item.product_id)">Remove</button>
				</div>
			</div>

			<div class="form-actions">
				<button class="cancel-btn" @click="emit('cancel')">Cancel</button>
				<button
					class="submit-order-btn"
					:disabled="orderItems.length === 0 || loading"
					@click="onSubmit"
				>
					{{ loading ? 'Creating...' : 'Create Order' }}
				</button>
			</div>
		</div>
	</div>
</template>

<style scoped>
.order-form {
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
}

.order-container {
	display: grid;
	grid-template-columns: 380px 1fr;
	gap: 1.5rem;
	align-items: start;
}

.selected-product-section,
.product-list-section,
.order-items-card {
	background: #ffffff;
	padding: 1.75rem;
	border-radius: 12px;
	border: 1.5px solid #e5e7eb;
	box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}

.select-prompt {
	text-align: center;
	padding: 3rem 1rem;
	color: #6b7280;
}

.select-prompt h3 {
	color: #111827;
	font-size: 1.15rem;
	margin: 0 0 0.5rem;
}

.select-prompt p {
	font-size: 0.9rem;
	margin: 0;
}

.section-title {
	margin-top: 0;
	margin-bottom: 1.25rem;
	font-size: 1.15rem;
	font-weight: 700;
	color: #111827;
}

.products-grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
	gap: 1rem;
	max-height: 450px;
	overflow-y: auto;
	padding-right: 4px;
}

.order-items-card h2 {
	margin-top: 0;
	margin-bottom: 1.25rem;
	font-size: 1.25rem;
	font-weight: 700;
	color: #111827;
}

.empty-order {
	text-align: center;
	color: #6b7280;
	padding: 1rem 0;
}

.order-list {
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	margin-bottom: 1.5rem;
	max-height: 250px;
	overflow-y: auto;
}

.order-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0.75rem 1rem;
	background-color: #f9fafb;
	border: 1px solid #e5e7eb;
	border-radius: 8px;
}

.item-name {
	font-weight: 600;
	color: #1f2937;
}

.item-qty {
	color: #4b5563;
	font-size: 0.9rem;
}

.remove-btn {
	background-color: #fef2f2;
	color: #dc2626;
	border: 1px solid #fecaca;
	padding: 0.35rem 0.75rem;
	border-radius: 6px;
	font-size: 0.85rem;
	font-weight: 600;
	cursor: pointer;
	transition: all 0.2s ease;
}

.remove-btn:hover {
	background-color: #dc2626;
	color: #ffffff;
}

.form-actions {
	display: flex;
	gap: 0.75rem;
}

.form-actions button {
	padding: 0.85rem;
	font-size: 1rem;
	font-weight: 600;
	border: none;
	border-radius: 8px;
	cursor: pointer;
	transition: background-color 0.2s ease-in-out;
}

.cancel-btn {
	flex: 1;
	background-color: #f3f4f6;
	color: #374151;
}

.cancel-btn:hover {
	background-color: #e5e7eb;
}

.submit-order-btn {
	flex: 2;
	color: #ffffff;
	background-color: #e11d48;
}

.submit-order-btn:hover {
	background-color: #be123c;
}

.submit-order-btn:disabled {
	background-color: #d1d5db;
	cursor: not-allowed;
}

@media (max-width: 900px) {
	.order-container {
		grid-template-columns: 1fr;
	}
}
</style>
