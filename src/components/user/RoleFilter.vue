<script setup>
import { ref, onMounted } from 'vue'
import { roleService } from '@/services/role'

const roleList = ref([])
const selectedRoleId = ref(null)

const selectRole = (id) => {
	selectedRoleId.value = id
	emit('role', id)
}

const getRoleList = async () => {
	roleList.value = await roleService.getRoleList()
}

const emit = defineEmits(['role'])
onMounted(() => {
	getRoleList()
})
</script>

<template>
	<aside class="role-sidebar">
		<h3>Roles</h3>

		<ul class="role-list">
			<li class="role-item" :class="{ active: selectedRoleId === null }" @click="selectRole(null)">
				All Roles
			</li>
			<li
				v-for="role in roleList"
				:key="role.id"
				class="role-item"
				:class="{ active: selectedRoleId === role.id }"
				@click="selectRole(role.id)"
			>
				{{ role.name }}
			</li>
		</ul>
	</aside>
</template>

<style scoped>
.role-sidebar {
	width: 260px;
	padding: 1.25rem 1rem;
	background-color: #ffffff;
	border: 1.5px solid #e5e7eb;
	border-radius: 12px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
	box-sizing: border-box;
}

.role-sidebar h3 {
	margin: 0 0 1rem;
	padding-bottom: 0.75rem;
	font-size: 1.1rem;
	font-weight: 700;
	color: #111827;
	border-bottom: 1px solid #f3f4f6;
}

.role-list {
	display: flex;
	flex-direction: column;
	gap: 0.35rem;
	margin: 0;
	padding: 0;
	list-style: none;
}

.role-item {
	padding: 0.75rem 1rem;
	font-size: 0.925rem;
	font-weight: 500;
	color: #4b5563;
	border-radius: 8px;
	cursor: pointer;
	transition: all 0.2s ease-in-out;
}

.role-item:hover {
	color: #e11d48;
	background-color: #fff1f2;
}

.role-item.active {
	color: #ffffff;
	font-weight: 600;
	background-color: #e11d48;
	box-shadow: 0 4px 12px rgba(225, 29, 72, 0.2);
}

@media (max-width: 768px) {
	.role-sidebar {
		width: 100%;
	}
}
</style>
