<template>
	<div class="home-container">
		<div class="home-content">
			<div class="welcome-header">
				<h1>RMs</h1>
				<p>Select the module you want to access</p>
			</div>

			<div class="routes-grid">
				<RouterLink :to="{ name: 'tables' }" class="card-btn">
					<div class="card-content">
						<span class="card-title">Tables</span>
						<span class="card-desc">...</span>
					</div>
					<div class="card-arrow">→</div>
				</RouterLink>

				<RouterLink :to="{ name: 'products' }" class="card-btn">
					<div class="card-content">
						<span class="card-title">Products</span>
						<span class="card-desc">...</span>
					</div>
					<div class="card-arrow">→</div>
				</RouterLink>

				<RouterLink :to="{ name: 'kitchen' }" class="card-btn">
					<div class="card-content">
						<span class="card-title">Kitchen</span>
						<span class="card-desc">...</span>
					</div>
					<div class="card-arrow">→</div>
				</RouterLink>

				<RouterLink :to="{ name: 'moderation' }" class="card-btn">
					<div class="card-content">
						<span class="card-title">Modaration</span>
						<span class="card-desc">...</span>
					</div>
					<div class="card-arrow">→</div>
				</RouterLink>

				<RouterLink :to="{ name: 'cash' }" class="card-btn full-width">
					<div class="card-content">
						<span class="card-title">Cash</span>
						<span class="card-desc">...</span>
					</div>
					<div class="card-arrow">→</div>
				</RouterLink>
			</div>
		</div>
	</div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.home-container {
	min-height: calc(100vh - 70px);
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 2rem 1.5rem;
	background-color: #f9fafb;
	box-sizing: border-box;
}

.home-content {
	width: 100%;
	max-width: 800px;
	display: flex;
	flex-direction: column;
	gap: 2rem;
}

.welcome-header {
	text-align: center;
}

.welcome-header h1 {
	font-size: 2rem;
	font-weight: 700;
	color: #111827;
	margin: 0;
	letter-spacing: -0.025em;
}

.welcome-header p {
	font-size: 1rem;
	color: #6b7280;
	margin-top: 0.5rem;
}

.routes-grid {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
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

.full-width {
	grid-column: span 2;
}

@media (max-width: 640px) {
	.routes-grid {
		grid-template-columns: 1fr;
	}

	.full-width {
		grid-column: span 1;
	}
}
</style>
