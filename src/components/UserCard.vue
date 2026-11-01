<script setup>
import { formatDate } from '@/utils/format'

defineProps({
	user: { type: Object, required: true },
})
</script>

<template>
	<div class="user-card">
		<div class="user-card__head">
			<h4>{{ user.display_name }}</h4>
			<span class="username">@{{ user.username }}</span>
		</div>

		<span class="email">{{ user.email }}</span>
		<span class="joined">Created {{ formatDate(user.created_at) }}</span>
	</div>
</template>

<style scoped>
.user-card {
	display: flex;
	height: 100%;
	box-sizing: border-box;
	flex-direction: column;
	gap: 0.4rem;
	padding: 1.5rem;
	background: #ffffff;
	border: 1.5px solid #e5e7eb;
	border-radius: 12px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
	transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.user-card:hover {
	border-color: #e11d48;
	transform: translateY(-2px);
	box-shadow: 0 10px 20px -5px rgba(225, 29, 72, 0.1);
}

.user-card__head h4 {
	margin: 0;
	font-size: 1.1rem;
	font-weight: 600;
	color: #1f2937;
}

.username {
	font-size: 0.85rem;
	color: #e11d48;
}

.email {
	font-size: 0.9rem;
	color: #4b5563;
	overflow-wrap: anywhere;
}

.joined {
	margin-top: 0.4rem;
	font-size: 0.8rem;
	color: #9ca3af;
}
</style>
