<script setup></script>

<template>
	<div class="not-found-box">
		<div class="badge">Empty</div>
		<p class="not-found-text">{{ message }}</p>
	</div>
</template>

<style scoped>
.not-found-box {
	background-color: #ffffff;
	border: 1.5px dashed #e5e7eb;
	border-radius: 12px;
	padding: 3.5rem 1.5rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	text-align: center;
	gap: 0.5rem;
}

.badge {
	font-size: 0.75rem;
	font-weight: 700;
	text-transform: uppercase;
	letter-spacing: 0.06em;
	color: #e11d48;
	background-color: #fff1f2;
	border: 1px solid #fecdd3;
	padding: 0.25rem 0.75rem;
	border-radius: 999px;
}

.not-found-text {
	margin: 0.25rem 0 0;
	font-size: 0.95rem;
	font-weight: 500;
	color: #6b7280;
}
</style>
