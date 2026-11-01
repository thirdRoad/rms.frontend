<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { tablesService } from '@/services/tables'
import { orderService } from '@/services/order'
import { authService } from '@/services/auth'
import TablesDetailCard from '@/components/TablesDetailCard.vue'
import OrderForm from '@/components/OrderForm.vue'

const route = useRoute()
const router = useRouter()

const table = ref(null)
const isOrdering = ref(false)
const isCreating = ref(false)

const fetchTable = async (id) => {
	table.value = await tablesService.getTable(id)
}

const createOrder = async (items) => {
	isCreating.value = true

	try {
		const me = await authService.getMe()

		await orderService.createOrder({
			user_id: me.id,
			table_id: table.value.id,
			items: items,
		})
		router.push({ name: 'tables' })
	} catch (error) {
		console.error(error)
	} finally {
		isCreating.value = false
	}
}

const handleChangeTable = () => {
	// TODO: needs backend support
}

watch(
	() => route.params.id,
	(id) => {
		isOrdering.value = false
		fetchTable(id)
	},
	{ immediate: true },
)
</script>

<template>
	<div class="table-detail-view">
		<div class="view-wrapper">
			<div class="actions-header">
				<button class="back-btn" @click="router.push({ name: 'tables' })">← Back to Tables</button>
			</div>

			<TablesDetailCard
				v-if="table"
				:table="table"
				@order="isOrdering = true"
				@change-table="handleChangeTable"
			/>

			<OrderForm
				v-if="table && isOrdering"
				:loading="isCreating"
				@submit="createOrder"
				@cancel="isOrdering = false"
			/>
		</div>
	</div>
</template>

<style scoped>
.table-detail-view {
	min-height: calc(100vh - 70px);
	display: flex;
	justify-content: center;
	padding: 2.5rem 1.5rem;
	background-color: #f9fafb;
	box-sizing: border-box;
}

.view-wrapper {
	width: 100%;
	max-width: 1200px;
	display: flex;
	flex-direction: column;
	gap: 1.25rem;
}

.actions-header {
	display: flex;
	align-items: center;
	justify-content: flex-start;
}

.back-btn {
	background: none;
	border: none;
	color: #4b5563;
	font-weight: 600;
	font-size: 0.95rem;
	cursor: pointer;
	padding: 0;
	transition: color 0.2s ease;
}

.back-btn:hover {
	color: #111827;
}
</style>
