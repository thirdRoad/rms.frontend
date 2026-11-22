<script setup>
import { ref } from 'vue'

const selectStatusValue = ref(null)
const emit = defineEmits(['select'])

const selectStatus = (status) => {
	selectStatusValue.value = status
	emit('select', status)
}
</script>

<template>
	<aside class="status-sidebar">
		<div class="sidebar-header">
			<h3>Statuses</h3>
		</div>

		<nav class="status-list">
			<a
				href="#"
				class="status-item"
				:class="{ active: selectStatusValue === null }"
				@click.prevent="selectStatus(null)"
			>
				<span>All Statuses</span>
			</a>

			<a
				href="#"
				class="status-item"
				:class="{ active: selectStatusValue === 'preparation' }"
				@click.prevent="selectStatus('preparation')"
			>
				<span>Preparation</span>
			</a>

			<a
				href="#"
				class="status-item"
				:class="{ active: selectStatusValue === 'cancelled' }"
				@click.prevent="selectStatus('cancelled')"
			>
				<span>Cancelled</span>
			</a>

			<a
				href="#"
				class="status-item"
				:class="{ active: selectStatusValue === 'done' }"
				@click.prevent="selectStatus('done')"
			>
				<span>Done</span>
			</a>
		</nav>
	</aside>
</template>

<style scoped>
.status-sidebar {
	width: 260px;
	min-width: 260px;
	background-color: #ffffff;
	border: 1.5px solid #e5e7eb;
	border-radius: 12px;
	padding: 1.25rem 1rem;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
	display: flex;
	flex-direction: column;
	gap: 1rem;
	height: fit-content;
	max-height: calc(100vh - 120px);
	box-sizing: border-box;
}

.sidebar-header h3 {
	margin: 0;
	font-size: 1.1rem;
	font-weight: 700;
	color: #111827;
	padding-bottom: 0.75rem;
	border-bottom: 1px solid #f3f4f6;
}

.status-list {
	display: flex;
	flex-direction: column;
	gap: 0.35rem;
	overflow-y: auto;
	padding-right: 4px;
}

.status-list::-webkit-scrollbar {
	width: 5px;
}

.status-list::-webkit-scrollbar-track {
	background: #f1f5f9;
	border-radius: 4px;
}

.status-list::-webkit-scrollbar-thumb {
	background: #cbd5e1;
	border-radius: 4px;
}

.status-item {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0.75rem 1rem;
	text-decoration: none;
	font-size: 0.925rem;
	font-weight: 500;
	color: #4b5563;
	border-radius: 8px;
	transition: all 0.2s ease-in-out;
}

.status-item:hover {
	color: #e11d48;
	background-color: #fff1f2;
}

.status-item.active {
	color: #ffffff;
	font-weight: 600;
	background-color: #e11d48;
	box-shadow: 0 4px 12px rgba(225, 29, 72, 0.2);
}

@media (max-width: 768px) {
	.status-sidebar {
		width: 100%;
		min-width: 100%;
		max-height: none;
	}
}
</style>
