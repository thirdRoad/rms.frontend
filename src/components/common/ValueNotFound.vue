<script setup>
defineProps({
	title: {
		type: String,
		default: 'No results found',
	},
	description: {
		type: String,
		default: 'There are no items matching your current criteria.',
	},
})
</script>

<template>
	<div class="not-found-box">
		<div class="badge">Empty</div>
		<h3 class="not-found-title">{{ title }}</h3>
		<p class="not-found-description">{{ description }}</p>
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
	gap: 0.65rem;
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
	margin-bottom: 0.25rem;
}

.not-found-title {
	margin: 0;
	font-size: 1.15rem;
	font-weight: 700;
	color: #111827;
	letter-spacing: -0.02em;
}

.not-found-description {
	margin: 0;
	max-width: 380px;
	font-size: 0.9rem;
	color: #6b7280;
	line-height: 1.5;
}
</style>
