<script setup>
import { formatDate } from '@/utils/format'

defineProps({
	user: {
		type: Object,
		required: true,
	},
})
</script>

<template>
	<div class="user-detail-card">
		<div class="card-header">
			<div>
				<h1>{{ user.display_name }}</h1>
				<span class="username">@{{ user.username }}</span>
			</div>
			<span v-if="user.role" class="role-badge">{{ user.role.name }}</span>
		</div>

		<div class="info-grid">
			<div class="info-item full-width">
				<span class="info-label">Email</span>
				<span class="info-value">{{ user.email }}</span>
			</div>

			<div class="info-item">
				<span class="info-label">User ID</span>
				<span class="info-value">{{ user.id }}</span>
			</div>

			<div v-if="user.created_at" class="info-item">
				<span class="info-label">Created At</span>
				<span class="info-value">{{ formatDate(user.created_at) }}</span>
			</div>
		</div>
	</div>
</template>

<style scoped>
.user-detail-card {
	width: 100%;
	padding: 2rem;
	background: #ffffff;
	border: 1.5px solid #e5e7eb;
	border-radius: 12px;
	box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
	box-sizing: border-box;
}

.card-header {
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	gap: 1rem;
	padding-bottom: 1.25rem;
	margin-bottom: 1.5rem;
	border-bottom: 1px solid #f3f4f6;
}

.card-header h1 {
	margin: 0;
	font-size: 1.5rem;
	font-weight: 700;
	color: #111827;
	letter-spacing: -0.025em;
}

.username {
	font-size: 0.9rem;
	color: #e11d48;
}

.role-badge {
	padding: 4px 12px;
	font-size: 0.8rem;
	font-weight: 600;
	color: #e11d48;
	background-color: #fff1f2;
	border-radius: 20px;
	white-space: nowrap;
}

.info-grid {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 1.25rem;
}

.info-item {
	display: flex;
	flex-direction: column;
	gap: 0.35rem;
}

.info-item.full-width {
	grid-column: span 2;
}

.info-label {
	font-size: 0.8rem;
	font-weight: 600;
	color: #6b7280;
	text-transform: uppercase;
	letter-spacing: 0.05em;
}

.info-value {
	font-size: 1rem;
	font-weight: 500;
	color: #1f2937;
	overflow-wrap: anywhere;
}

@media (max-width: 480px) {
	.user-detail-card {
		padding: 1.5rem;
	}

	.info-grid {
		grid-template-columns: 1fr;
	}

	.info-item.full-width {
		grid-column: span 1;
	}
}
</style>
