<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
	<div class="moderation-container">
		<div class="moderation-wrapper">
			<div class="page-header">
				<h1>Moderation</h1>
				<p>Manage users and keep track of the system</p>
			</div>

			<div class="modules-grid">
				<RouterLink to="/moderation/user-management" class="card-btn">
					<div class="card-content">
						<span class="card-title">User Management</span>
						<span class="card-desc">Add, edit and remove users</span>
					</div>
					<div class="card-arrow">→</div>
				</RouterLink>
			</div>
		</div>
	</div>
</template>

<style scoped>
.moderation-container {
	min-height: calc(100vh - 70px);
	display: flex;
	justify-content: center;
	padding: 2.5rem 1.5rem;
	background-color: #f9fafb;
	box-sizing: border-box;
}

.moderation-wrapper {
	width: 100%;
	max-width: 1200px;
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
}

.page-header h1 {
	font-size: 2rem;
	font-weight: 700;
	color: #111827;
	margin: 0;
	letter-spacing: -0.025em;
}

.page-header p {
	font-size: 0.95rem;
	color: #6b7280;
	margin-top: 0.4rem;
}

.modules-grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
	gap: 1.25rem;
}

.card-btn {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 1.5rem 1.75rem;
	background: #ffffff;
	border: 1.5px solid #e5e7eb;
	border-radius: 12px;
	text-decoration: none;
	transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.03);
}

.card-content {
	display: flex;
	flex-direction: column;
	gap: 0.25rem;
}

.card-title {
	font-size: 1.2rem;
	font-weight: 600;
	color: #1f2937;
	transition: color 0.2s ease;
}

.card-desc {
	font-size: 0.85rem;
	color: #6b7280;
}

.card-arrow {
	font-size: 1.25rem;
	font-weight: 600;
	color: #9ca3af;
	transition: all 0.25s ease;
}

.card-btn:hover {
	border-color: #e11d48;
	transform: translateY(-3px);
	box-shadow: 0 10px 20px -5px rgba(225, 29, 72, 0.12);
}

.card-btn:hover .card-title {
	color: #e11d48;
}

.card-btn:hover .card-arrow {
	color: #e11d48;
	transform: translateX(4px);
}
</style>
