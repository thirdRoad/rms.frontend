<script setup>
import { ref, onMounted } from 'vue'
import OrderCard from '@/components/OrderCard.vue'
import { orderService } from '@/services/order'

const orders = ref([])

onMounted(async () => {
	orders.value = await orderService.createOrderObject()
})

async function setStatusDone(orderId) {
	const success = await orderService.setOrderDone(orderId)

	if (success) {
		const order = orders.value.find((o) => o.id === orderId)
		order.status = 'done'
	}
}

async function setStatusCancel(orderId) {
	const success = await orderService.setOrderCancelled(orderId)

	if (success) {
		const order = orders.value.find((o) => o.id === orderId)
		order.status = 'cancelled'
	}
}
</script>

<template>
	<div class="kitchen">
		<div class="kitchen-header">
			<h1>Orders</h1>
			<span class="order-count">{{ orders.length }}</span>
		</div>

		<div class="orders-grid">
			<OrderCard
				v-for="order in orders"
				:key="order.id"
				:order="order"
				@done="setStatusDone"
				@cancel="setStatusCancel"
			/>
		</div>
	</div>
</template>

<style scoped>
.kitchen {
	max-width: 1200px;
	margin: 0 auto;
	padding: 24px;
}

.kitchen-header {
	display: flex;
	align-items: center;
	gap: 10px;
	margin-bottom: 20px;
}

.kitchen-header h1 {
	font-size: 1.4rem;
	font-weight: 700;
	color: #111827;
	margin: 0;
}

.order-count {
	padding: 2px 10px;
	border-radius: 999px;
	background: #fff1f2;
	color: #e11d48;
	font-size: 0.85rem;
	font-weight: 600;
}

.orders-grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
	gap: 16px;
}
</style>
