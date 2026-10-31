<script setup>
defineProps({
	product: {
		type: Object,
		required: true,
	},
})
</script>

<template>
	<div class="product-card">
		<div class="product-card__info">
			<h4>{{ product.name }}</h4>
			<p class="price">{{ product.price.toFixed(2) }} ₺</p>
		</div>
	</div>
</template>

<style scoped>
.product-card {
	background: #ffffff;
	border: 1.5px solid #e5e7eb;
	border-radius: 12px;
	padding: 1.5rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
	transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
}

.product-card:hover {
	border-color: #e11d48;
	transform: translateY(-2px);
	box-shadow: 0 10px 20px -5px rgba(225, 29, 72, 0.1);
}

.product-card__info {
	display: flex;
	flex-direction: column;
	gap: 0.4rem;
	width: 100%;
}

.product-card__info h4 {
	margin: 0;
	font-size: 1.1rem;
	font-weight: 600;
	color: #1f2937;
}

.product-card__info .price {
	margin: 0;
	font-size: 1rem;
	font-weight: 700;
	color: #e11d48;
}
</style>
