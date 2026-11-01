<script setup>
import { ref, watch } from 'vue'
import { tablesService } from '@/services/tables'
import TablesDetailCard from '@/components/TablesDetailCard.vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const table = ref(null)

const fetchTable = async (id) => {
	const data = await tablesService.getTable(id)
	table.value = data
}

const handleOrder = () => {
	router.push({
		name: 'order-new',
		params: {
			id: route.params.id,
		},
	})
}

const handleChangeTable = () => {
	console.log('Change table for:', table.value.id)
}

watch(
	() => route.params.id,
	(id) => fetchTable(id),
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
				@order="handleOrder"
				@change-table="handleChangeTable"
			/>
		</div>
	</div>
</template>

<style scoped>
.table-detail-view {
	min-height: calc(100vh - 70px);
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 2.5rem 1.5rem;
	background-color: #f9fafb;
	box-sizing: border-box;
}

.view-wrapper {
	width: 100%;
	max-width: 700px;
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
