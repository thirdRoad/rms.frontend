<script setup>
defineProps({
	title: {
		type: String,
		required: true,
	},
	message: {
		type: String,
		required: true,
	},
})
</script>

<template>
	<div class="toast">
		<strong>{{ title }}</strong>
		<span>{{ message }}</span>
	</div>
</template>

<style scoped>
.toast {
	position: fixed;
	right: 24px;
	bottom: 24px;
	z-index: 1000;
	display: flex;
	flex-direction: column;
	gap: 0.2rem;
	min-width: 220px;
	padding: 0.9rem 1.25rem;
	background-color: #ffffff;
	border: 1.5px solid #e5e7eb;
	border-left: 4px solid #22c55e;
	border-radius: 10px;
	box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.15);
}

.toast strong {
	font-size: 0.95rem;
	color: #111827;
}

.toast span {
	font-size: 0.875rem;
	color: #4b5563;
}
</style>
