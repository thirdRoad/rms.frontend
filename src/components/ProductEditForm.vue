<script setup>
import { reactive } from 'vue'

const props = defineProps({
	product: {
		type: Object,
		required: true,
	},
	categories: {
		type: Array,
		default: () => [],
	},
})

const emit = defineEmits(['submit-edit-product'])

const formData = reactive({
	name: props.product.name ?? '',
	price: props.product.price ?? '',
	stock: props.product.stock ?? '',
	category_id: props.product.category?.id ?? props.product.category_id ?? null,
})

const onSubmit = () => {
	emit('submit-edit-product', { ...formData })
}
</script>

<template>
	<div class="form-container">
		<form class="editProduct-form" @submit.prevent="onSubmit">
			<h3 class="form-title">Edit Product</h3>

			<div class="form-group">
				<label for="productName">Product Name</label>
				<input
					id="productName"
					v-model="formData.name"
					type="text"
					placeholder="e.g. Cheese Burger, Espresso..."
					required
				/>
			</div>

			<div class="form-group">
				<label for="productPrice">Price (₺)</label>
				<input
					id="productPrice"
					v-model.number="formData.price"
					type="number"
					step="0.01"
					min="0"
					placeholder="0.00"
					required
				/>
			</div>

			<div class="form-group">
				<label for="productStock">Stock Quantity</label>
				<input
					id="productStock"
					v-model.number="formData.stock"
					type="number"
					min="0"
					placeholder="e.g. 50"
					required
				/>
			</div>

			<div class="form-group">
				<label for="categoryId">Category</label>
				<select id="categoryId" v-model="formData.category_id" required>
					<option :value="null" disabled>Select a category</option>

					<option v-for="category in categories" :key="category.id" :value="category.id">
						{{ category.name }}
					</option>
				</select>
			</div>

			<button type="submit" class="submit-btn">Update Product</button>
		</form>
	</div>
</template>

<style scoped>
.form-container {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 1.5rem;
	width: 100%;
}

.editProduct-form {
	background: #ffffff;
	padding: 1.75rem;
	border-radius: 12px;
	border: 1.5px solid #e5e7eb;
	box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
	width: 100%;
	max-width: 440px;
	box-sizing: border-box;
}

.form-title {
	margin-top: 0;
	margin-bottom: 1.25rem;
	font-size: 1.25rem;
	font-weight: 700;
	color: #111827;
	text-align: center;
	letter-spacing: -0.025em;
}

.form-group {
	margin-bottom: 1.15rem;
}

.form-group label {
	display: block;
	margin-bottom: 0.4rem;
	font-size: 0.875rem;
	font-weight: 600;
	color: #374151;
}

.form-group input,
.form-group select {
	width: 100%;
	padding: 0.75rem 1rem;
	font-size: 0.95rem;
	border: 1.5px solid #e5e7eb;
	border-radius: 8px;
	outline: none;
	transition: all 0.2s ease-in-out;
	box-sizing: border-box;
	background-color: #f9fafb;
	color: #1f2937;
}

.form-group select {
	appearance: none;
	background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
	background-repeat: no-repeat;
	background-position: right 1rem center;
	background-size: 1.1em;
	padding-right: 2.5rem;
}

.form-group input:focus,
.form-group select:focus {
	border-color: #dc2626;
	background-color: #ffffff;
	box-shadow: 0 0 0 4px rgba(242, 122, 26, 0.1);
}

.submit-btn {
	width: 100%;
	margin-top: 0.5rem;
	padding: 0.85rem;
	font-size: 1rem;
	font-weight: 600;
	color: #ffffff;
	background-color: #dc2626;
	border: none;
	border-radius: 8px;
	cursor: pointer;
	transition:
		background-color 0.2s ease-in-out,
		transform 0.1s ease;
}

.submit-btn:hover {
	background-color: #dc2626;
}

.submit-btn:active {
	transform: scale(0.99);
}
</style>
