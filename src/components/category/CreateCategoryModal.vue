<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({
	show: { type: Boolean, default: false },
	loading: { type: Boolean, default: false },
})

const emit = defineEmits(['submit', 'close'])

const formData = reactive({ name: '' })

// Clear the form every time the modal is opened
watch(
	() => props.show,
	(isOpen) => {
		if (isOpen) {
			formData.name = ''
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
			<h2>Add Category</h2>

			<div class="form-group">
				<label for="categoryName">Category Name</label>
				<input
					id="categoryName"
					v-model="formData.name"
					type="text"
					placeholder="e.g. Hamburger, Dessert..."
					required
				/>
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
	max-width: 400px;
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

.form-group label {
	display: block;
	margin-bottom: 0.4rem;
	font-size: 0.875rem;
	font-weight: 600;
	color: #374151;
}

.form-group input {
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

.form-group input:focus {
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
