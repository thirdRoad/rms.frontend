<script setup>
import { ref, onMounted } from 'vue'
import OrderCard from '@/components/order/OrderCard.vue'
import { orderService } from '@/services/order'
import StatusFilter from '@/components/order/StatusFilter.vue'
import SearchBox from '@/components/common/SearchBox.vue'
import SortSelect from '@/components/common/SortSelect.vue'
import EmptyCard from '@/components/common/EmptyCard.vue'

const orders = ref([])
const selectedStatusValue = ref(null)
const searchValue = ref('')
const sortValue = ref('')
const hasLoaded = ref(false)

const sortOptions = [
	{ label: 'Newest', value: '-created_at' },
	{ label: 'Oldest', value: 'created_at' },
	{ label: 'Increasing Table', value: 'table_id' },
	{ label: 'Decreasing Table', value: '-table_id' },
]

const fetchOrders = async () => {
	const params = {}
	if (selectedStatusValue.value) params.status = selectedStatusValue.value
	if (searchValue.value.trim()) params.table = searchValue.value.trim()
	if (sortValue.value) params.sort = sortValue.value
	orders.value = await orderService.getOrderList(params)
	hasLoaded.value = true
}

const handleStatus = async (status) => {
	selectedStatusValue.value = status
	await fetchOrders()
}

const handleSearch = async (value) => {
	searchValue.value = value
	await fetchOrders()
}

const handleSort = async (value) => {
	sortValue.value = value
	await fetchOrders()
}

async function setStatusDone(orderId) {
	const success = await orderService.setOrderDone(orderId)

	if (success) {
		const order = orders.value.find((o) => o.id === orderId)
		if (order) order.status = 'done'
	}
	await fetchOrders()
}

async function setStatusCancel(orderId) {
	const success = await orderService.setOrderCancelled(orderId)

	if (success) {
		const order = orders.value.find((o) => o.id === orderId)
		if (order) order.status = 'cancelled'
	}
	await fetchOrders()
}

onMounted(fetchOrders)
</script>

<template>
	<div class="kitchen-container">
		<div class="kitchen-wrapper">
			<div class="kitchen-header">
				<div class="header-left">
					<h1>Orders</h1>
					<span class="order-count">{{ orders.length }}</span>
				</div>

				<div class="toolbar">
					<SearchBox
						placeholder="Search by table id..."
						label="Search orders"
						@search="handleSearch"
					/>
					<SortSelect :options="sortOptions" label="Sort orders" @sort="handleSort" />
				</div>
			</div>

			<div class="content-layout">
				<aside class="sidebar-section">
					<StatusFilter @select="handleStatus" />
				</aside>

				<main class="orders-scroll-area">
					<div v-if="orders.length > 0" class="orders-grid">
						<OrderCard
							v-for="order in orders"
							:key="order.id"
							:order="order"
							@done="setStatusDone"
							@cancel="setStatusCancel"
						/>
					</div>

					<EmptyCard v-else-if="hasLoaded" />
				</main>
			</div>
		</div>
	</div>
</template>

<style scoped>
.kitchen-container {
	min-height: calc(100vh - 70px);
	display: flex;
	justify-content: center;
	padding: 2.5rem 1.5rem;
	background-color: #f9fafb;
	box-sizing: border-box;
}

.kitchen-wrapper {
	width: 100%;
	max-width: 1200px;
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
}

.kitchen-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-wrap: wrap;
	gap: 1rem;
}

.header-left {
	display: flex;
	align-items: center;
	gap: 10px;
}

.kitchen-header h1 {
	font-size: 2rem;
	font-weight: 700;
	color: #111827;
	margin: 0;
	letter-spacing: -0.025em;
}

.order-count {
	padding: 3px 11px;
	border-radius: 999px;
	background: #fff1f2;
	color: #e11d48;
	border: 1px solid #fecdd3;
	font-size: 0.85rem;
	font-weight: 700;
}

.toolbar {
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	gap: 0.75rem;
}

/* Two-column layout: StatusFilter on left, orders on right */
.content-layout {
	display: flex;
	gap: 2rem;
	align-items: flex-start;
}

.sidebar-section {
	flex-shrink: 0;
}

.orders-scroll-area {
	flex: 1;
	min-width: 0;
	max-height: calc(100vh - 220px);
	overflow-y: auto;
	padding-right: 6px;
	padding-bottom: 1rem;
}

.orders-scroll-area::-webkit-scrollbar {
	width: 6px;
}

.orders-scroll-area::-webkit-scrollbar-track {
	background: #f1f5f9;
	border-radius: 4px;
}

.orders-scroll-area::-webkit-scrollbar-thumb {
	background: #cbd5e1;
	border-radius: 4px;
}

.orders-scroll-area::-webkit-scrollbar-thumb:hover {
	background: #94a3b8;
}

.orders-grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
	gap: 1.25rem;
}

@media (max-width: 768px) {
	.toolbar {
		width: 100%;
	}

	.content-layout {
		flex-direction: column;
	}

	.sidebar-section {
		width: 100%;
	}

	.orders-scroll-area {
		width: 100%;
		max-height: none;
	}
}
</style>
