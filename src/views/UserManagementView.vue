<script setup>
import UserCard from '@/components/UserCard.vue'
import RoleFilter from '@/components/RoleFilter.vue'
import CreateUserModal from '@/components/CreateUserModal.vue'
import { userManagementService } from '@/services/user-management'
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

const users = ref([])
const showCreateModal = ref(false)
const isCreating = ref(false)

onMounted(async () => {
	users.value = await userManagementService.getUserList()
})

async function createUser(data) {
	isCreating.value = true

	try {
		await userManagementService.createUser(data)
		users.value = await userManagementService.getUserList()
		showCreateModal.value = false
	} catch (error) {
		console.error(error)
	} finally {
		isCreating.value = false
	}
}
</script>

<template>
	<div class="users-container">
		<div class="users-wrapper">
			<div class="page-header">
				<div class="header-titles">
					<h1>User Management</h1>
					<p>{{ users.length }} users</p>
				</div>

				<div class="actions">
					<button class="action-btn" @click="showCreateModal = true">Add User</button>
					<button class="action-btn secondary">Add Role</button>
				</div>
			</div>

			<div class="content-layout">
				<RoleFilter />

				<main class="users-main">
					<div class="users-grid">
						<RouterLink
							v-for="user in users"
							:key="user.id"
							:to="{ name: 'user-detail', params: { id: user.id } }"
							class="user-card-link"
						>
							<UserCard :user="user" />
						</RouterLink>
					</div>
				</main>
			</div>
		</div>

		<CreateUserModal
			:show="showCreateModal"
			:loading="isCreating"
			@submit="createUser"
			@close="showCreateModal = false"
		/>
	</div>
</template>

<style scoped>
.users-container {
	min-height: calc(100vh - 70px);
	display: flex;
	justify-content: center;
	padding: 2.5rem 1.5rem;
	background-color: #f9fafb;
	box-sizing: border-box;
}

.users-wrapper {
	width: 100%;
	max-width: 1200px;
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
}

.page-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-wrap: wrap;
	gap: 1rem;
}

.action-btn {
	padding: 0.7rem 1.25rem;
	border: none;
	border-radius: 8px;
	background-color: #e11d48;
	color: #ffffff;
	font-size: 0.9rem;
	font-weight: 600;
	cursor: pointer;
	transition: background-color 0.2s ease;
}

.action-btn:hover {
	background-color: #be123c;
}

.actions {
	display: flex;
	align-items: center;
	gap: 10px;
}

.action-btn.secondary {
	background-color: #ffffff;
	color: #374151;
	border: 1.5px solid #e5e7eb;
}

.action-btn.secondary:hover {
	background-color: #f3f4f6;
	border-color: #d1d5db;
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

.content-layout {
	display: flex;
	gap: 2rem;
	align-items: flex-start;
}

.users-main {
	flex: 1;
	min-width: 0;
}

@media (max-width: 768px) {
	.content-layout {
		flex-direction: column;
	}

	.users-main {
		width: 100%;
	}
}

.users-grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
	gap: 1.25rem;
}

.user-card-link {
	display: block;
	color: inherit;
	text-decoration: none;
}
</style>
