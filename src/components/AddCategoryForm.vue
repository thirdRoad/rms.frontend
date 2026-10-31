<script setup>
import { reactive } from 'vue'

const emit = defineEmits(['submit-add-category'])

const formData = reactive({
	name: '',
})

const onSubmit = () => {
	emit('submit-add-category', { ...formData })
}
</script>

<template>
	<div class="form-container">
		<form class="addCategory-form" @submit.prevent="onSubmit">
			<div class="form-group">
				<label for="categoryName">Category Name</label>
				<input
					id="categoryName"
					type="text"
					v-model="formData.name"
					placeholder="hamburger, dessert..."
					required
				/>
			</div>

			<button type="submit" class="submit-btn">Save Category</button>
		</form>
	</div>
</template>

<style scoped>
.form-container {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 1.5rem;
}

.addCategory-form {
	background: #ffffff;
	padding: 1.75rem;
	border-radius: 12px;
	border: 1.5px solid #e5e7eb;
	box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
	width: 100%;
	max-width: 400px;
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
	margin-bottom: 1.25rem;
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
	border: 1.5px solid #e5e7eb;
	border-radius: 8px;
	outline: none;
	transition: all 0.2s ease-in-out;
	box-sizing: border-box;
	background-color: #f9fafb;
	color: #1f2937;
}

.form-group input:focus {
	border-color: #e11d48;
	background-color: #ffffff;
	box-shadow: 0 0 0 4px rgba(225, 29, 72, 0.1);
}

.submit-btn {
	width: 100%;
	padding: 0.85rem;
	font-size: 1rem;
	font-weight: 600;
	color: #ffffff;
	background-color: #e11d48;
	border: none;
	border-radius: 8px;
	cursor: pointer;
	transition:
		background-color 0.2s ease-in-out,
		transform 0.1s ease;
}

.submit-btn:hover {
	background-color: #be123c;
}

.submit-btn:active {
	transform: scale(0.99);
}
</style>
