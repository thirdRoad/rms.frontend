<script setup>
import { ref, onMounted } from 'vue'
import { tablesService } from '@/services/tables'
import TableCard from '@/components/TableCard.vue'
import { RouterLink } from 'vue-router'

const tables = ref([])

const fetchTables = async () => {
	const data = await tablesService.getTablesList()
	tables.value = data
}

onMounted(() => {
	fetchTables()
})
</script>

<template>
	<div class="tables-container">
		<div class="tables-wrapper">
			<div class="page-header">
				<h1>Tables Management</h1>
				<p>Monitor table status and active layouts</p>
			</div>

			<main class="tables-scroll-area">
				<div class="tables-grid">
					<RouterLink
						v-for="table in tables"
						:key="table.id"
						:to="`/tables/${table.id}`"
						class="table-card-link"
					>
						<TableCard :table="table" />
					</RouterLink>
				</div>
			</main>
		</div>
	</div>
</template>

<style scoped>
.tables-container {
	min-height: calc(100vh - 70px);
	display: flex;
	justify-content: center;
	padding: 2.5rem 1.5rem;
	background-color: #f9fafb;
	box-sizing: border-box;
}

.tables-wrapper {
	width: 100%;
	max-width: 1100px;
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
}

.page-header {
	text-align: center;
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

/* Scrollable area */
.tables-scroll-area {
	max-height: calc(100vh - 220px);
	overflow-y: auto;
	padding-right: 6px;
	padding-bottom: 1rem;
}

/* Custom scrollbar */
.tables-scroll-area::-webkit-scrollbar {
	width: 6px;
}

.tables-scroll-area::-webkit-scrollbar-track {
	background: #f1f5f9;
	border-radius: 4px;
}

.tables-scroll-area::-webkit-scrollbar-thumb {
	background: #cbd5e1;
	border-radius: 4px;
}

.tables-scroll-area::-webkit-scrollbar-thumb:hover {
	background: #94a3b8;
}

/* Grid layout */
.tables-grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
	gap: 1.25rem;
}

.table-card-link {
	text-decoration: none;
	color: inherit;
	display: block;
	border-radius: 12px;
	transition: transform 0.2s ease;
}
</style>
