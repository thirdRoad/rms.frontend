<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({
	show: { type: Boolean, default: false },
	loading: { type: Boolean, default: false },
	categories: { type: Array, default: () => [] },
})

const emit = defineEmits(['submit', 'close'])

const emptyForm = {
	name: '',
	price: null,
	stock: null,
	category_id: null,
}

const formData = reactive({ ...emptyForm })

// Clear the form every time the modal is opened
watch(
	() => props.show,
	(isOpen) => {
		if (isOpen) {
			Object.assign(formData, emptyForm)
		}
	},
)

const onSubmit = () => {
	emit('submit', { ...formData })
}
</script>

<template>
	<div v-if="show" class="modal-overlay" @click.self="emit('close')">
		<form class="modal-content" @submit.prevent="onSubmit">
			<h2>Add Product</h2>

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

			<div class="modal-actions">
				<button type="button" class="cancel-btn" @click="emit('close')">Cancel</button>
				<button type="submit" class="submit-btn" :disabled="loading">
					{{ loading ? 'Saving...' : 'Save' }}
				</button>
			</div>
		</form>
	</div>
</template>

<style scoped>
.modal-overlay {
	position: fixed;
	inset: 0;
	background: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 9999;
	padding: 20px;
}

.modal-content {
	width: 100%;
	max-width: 440px;
	padding: 30px;
	background: #ffffff;
	border-radius: 14px;
	box-shadow: 0 10px 35px rgba(0, 0, 0, 0.15);
	box-sizing: border-box;
}

.modal-content h2 {
	margin: 0 0 1.25rem;
	color: #111827;
	font-size: 22px;
	text-align: center;
}

.form-group {
	margin-bottom: 1rem;
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
	color: #1f2937;
	background-color: #f9fafb;
	border: 1.5px solid #e5e7eb;
	border-radius: 8px;
	outline: none;
	box-sizing: border-box;
	transition: all 0.2s ease-in-out;
}

.form-group input::placeholder {
	color: #9ca3af;
}

.form-group input:focus,
.form-group select:focus {
	border-color: #e11d48;
	background-color: #ffffff;
	box-shadow: 0 0 0 4px rgba(225, 29, 72, 0.1);
}

.modal-actions {
	display: flex;
	gap: 12px;
	margin-top: 1.5rem;
}

.modal-actions button {
	flex: 1;
	padding: 11px 18px;
	border: none;
	border-radius: 8px;
	font-size: 14px;
	font-weight: 600;
	cursor: pointer;
}

.cancel-btn {
	background: #f3f4f6;
	color: #374151;
}

.cancel-btn:hover {
	background: #e5e7eb;
}

.submit-btn {
	background: #e11d48;
	color: #ffffff;
}

.submit-btn:hover {
	background: #be123c;
}

.submit-btn:disabled {
	opacity: 0.6;
	cursor: not-allowed;
}
</style>
