<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { userService } from '@/services/user'
import UserDetail from '@/components/user/UserDetail.vue'
import EditUserModal from '@/components/user/EditUserModal.vue'
import DeleteConfirmModal from '@/components/common/DeleteConfirmModal.vue'

const route = useRoute()
const router = useRouter()

const user = ref(null)
const showEditModal = ref(false)
const isSaving = ref(false)
const showDeleteModal = ref(false)

const fetchUser = async (id) => {
	try {
		user.value = await userService.getUser(id)
	} catch (error) {
		console.error(error)
	}
}

const updateUser = async (data) => {
	isSaving.value = true

	try {
		await userService.updateUser(route.params.id, data)
		await fetchUser(route.params.id)
		showEditModal.value = false
	} catch (error) {
		console.error(error)
	} finally {
		isSaving.value = false
	}
}

const deleteUser = async () => {
	try {
		await userService.deleteUser(route.params.id)
		showDeleteModal.value = false
		router.push({ name: 'users' })
	} catch (error) {
		console.error(error)
	}
}

watch(
	() => route.params.id,
	(id) => fetchUser(id),
	{ immediate: true },
)
</script>

<template>
	<div class="user-detail-view">
		<div class="view-wrapper">
			<div class="actions-header">
				<button class="back-btn" @click="router.push({ name: 'users' })">← Back to Users</button>

				<div v-if="user" class="action-buttons">
					<button class="edit-btn" @click="showEditModal = true">Edit User</button>
					<button class="delete-btn" @click="showDeleteModal = true">Delete User</button>
				</div>
			</div>

			<UserDetail v-if="user" :user="user" />
		</div>

		<EditUserModal
			v-if="user"
			:show="showEditModal"
			:loading="isSaving"
			:user="user"
			@submit="updateUser"
			@close="showEditModal = false"
		/>

		<DeleteConfirmModal
			:show="showDeleteModal"
			:item-name="user?.display_name"
			title="Delete User?"
			@confirm="deleteUser"
			@cancel="showDeleteModal = false"
		/>
	</div>
</template>

<style scoped>
.user-detail-view {
	min-height: calc(100vh - 70px);
	display: flex;
	justify-content: center;
	padding: 2.5rem 1.5rem;
	background-color: #f9fafb;
	box-sizing: border-box;
}

.view-wrapper {
	width: 100%;
	max-width: 600px;
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
}

.actions-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 1rem;
}

.back-btn {
	padding: 0.5rem 0;
	background: none;
	border: none;
	color: #4b5563;
	font-size: 0.95rem;
	font-weight: 600;
	cursor: pointer;
	transition: color 0.2s ease;
}

.back-btn:hover {
	color: #e11d48;
}

.action-buttons {
	display: flex;
	gap: 0.75rem;
}

.edit-btn,
.delete-btn {
	padding: 0.6rem 1.2rem;
	border-radius: 8px;
	font-size: 0.9rem;
	font-weight: 600;
	cursor: pointer;
	transition: all 0.2s ease;
}

.edit-btn {
	background-color: #f3f4f6;
	color: #374151;
	border: 1.5px solid #e5e7eb;
}

.edit-btn:hover {
	background-color: #e5e7eb;
	border-color: #d1d5db;
}

.delete-btn {
	background-color: #fef2f2;
	color: #dc2626;
	border: 1.5px solid #fecaca;
}

.delete-btn:hover {
	background-color: #dc2626;
	color: #ffffff;
	border-color: #dc2626;
}
</style>
