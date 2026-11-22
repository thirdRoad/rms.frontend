<script setup>
import UserCard from '@/components/user/UserCard.vue'
import RoleFilter from '@/components/user/RoleFilter.vue'
import CreateUserModal from '@/components/user/CreateUserModal.vue'
import SearchBox from '@/components/common/SearchBox.vue'
import SortSelect from '@/components/common/SortSelect.vue'
import ValueNotFound from '@/components/common/ValueNotFound.vue'
import { userService } from '@/services/user'
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

const users = ref([])
const showCreateModal = ref(false)
const isCreating = ref(false)

const selectedRoleId = ref(null)
const searchValue = ref('')
const sortValue = ref('')

const sortOptions = [
	{ label: 'Newest', value: '-created_at' },
	{ label: 'Oldest', value: 'created_at' },
	{ label: 'Username (A-Z)', value: 'username' },
	{ label: 'Username (Z-A)', value: '-username' },
	{ label: 'Display name (A-Z)', value: 'display_name' },
	{ label: 'Display name (Z-A)', value: '-display_name' },
	{ label: 'Email (A-Z)', value: 'email' },
	{ label: 'Email (Z-A)', value: '-email' },
]

const fetchUsers = async () => {
	const params = {}
	if (selectedRoleId.value) params.role = selectedRoleId.value
	if (searchValue.value) params.display_name = searchValue.value
	if (sortValue.value) params.sort = sortValue.value
	users.value = await userService.getUserList(params)
}

onMounted(() => {
	fetchUsers()
})

const filterByRole = async (roleId) => {
	selectedRoleId.value = roleId
	await fetchUsers()
}

const handleSearch = async (value) => {
	searchValue.value = value
	await fetchUsers()
}

const handleSort = async (value) => {
	sortValue.value = value
	await fetchUsers()
}

async function createUser(data) {
	isCreating.value = true

	try {
		await userService.createUser(data)
		await fetchUsers()
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

				<div class="toolbar">
					<SearchBox
						placeholder="Search by displayname..."
						label="Search users"
						@search="handleSearch"
					/>
					<SortSelect :options="sortOptions" label="Sort users" @sort="handleSort" />
				</div>

				<div class="actions">
					<button class="action-btn" @click="showCreateModal = true">Add User</button>
					<button class="action-btn secondary">Add Role</button>
				</div>
			</div>

			<div class="content-layout">
				<RoleFilter @role="filterByRole" />

				<main class="users-main">
					<div v-if="users.length > 0" class="users-grid">
						<RouterLink
							v-for="user in users"
							:key="user.id"
							:to="{ name: 'user-detail', params: { id: user.id } }"
							class="user-card-link"
						>
							<UserCard :user="user" />
						</RouterLink>
					</div>

					<ValueNotFound
						v-else
						title="No users found"
						description="Try adjusting your search or role filter, or add a new user ."
					/>
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

.toolbar {
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	gap: 0.6rem;
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
