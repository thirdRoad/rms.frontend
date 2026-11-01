<script setup>
import { reactive, ref, onMounted } from 'vue'
import { roleService } from '@/services/role'

const props = defineProps({
	user: { type: Object, required: true },
	loading: { type: Boolean, default: false },
})

const emit = defineEmits(['submit', 'cancel'])

const roleList = ref([])

// Edit a copy, so Cancel leaves the original user untouched
const formData = reactive({
	username: props.user.username,
	display_name: props.user.display_name,
	email: props.user.email,
	password: '',
	role_id: props.user.role?.id ?? null,
})

onMounted(async () => {
	roleList.value = await roleService.getRoleList()
})

const onSubmit = () => {
	const data = { ...formData }

	// Empty password means "keep the current one"
	if (!data.password) {
		delete data.password
	}

	emit('submit', data)
}
</script>

<template>
	<form class="user-edit-card" @submit.prevent="onSubmit">
		<div class="card-header">
			<h1>Edit User</h1>
			<span class="username">@{{ user.username }}</span>
		</div>

		<div class="form-group">
			<label for="username">Username</label>
			<input id="username" v-model="formData.username" type="text" required />
		</div>

		<div class="form-group">
			<label for="displayName">Display Name</label>
			<input id="displayName" v-model="formData.display_name" type="text" required />
		</div>

		<div class="form-group">
			<label for="email">Email</label>
			<input id="email" v-model="formData.email" type="email" required />
		</div>

		<div class="form-group">
			<label for="password">New Password</label>
			<input
				id="password"
				v-model="formData.password"
				type="password"
				placeholder="Leave empty to keep current password"
				autocomplete="new-password"
			/>
		</div>

		<div class="form-group">
			<label for="role">Role</label>
			<select id="role" v-model="formData.role_id" required>
				<option :value="null" disabled>Select a role</option>
				<option v-for="role in roleList" :key="role.id" :value="role.id">
					{{ role.name }}
				</option>
			</select>
		</div>

		<div class="form-actions">
			<button type="button" class="cancel-btn" @click="emit('cancel')">Cancel</button>
			<button type="submit" class="submit-btn" :disabled="loading">
				{{ loading ? 'Saving...' : 'Save' }}
			</button>
		</div>
	</form>
</template>

<style scoped>
.user-edit-card {
	width: 100%;
	padding: 2rem;
	background: #ffffff;
	border: 1.5px solid #e5e7eb;
	border-radius: 12px;
	box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
	box-sizing: border-box;
}

.card-header {
	padding-bottom: 1.25rem;
	margin-bottom: 1.5rem;
	border-bottom: 1px solid #f3f4f6;
}

.card-header h1 {
	margin: 0;
	font-size: 1.5rem;
	font-weight: 700;
	color: #111827;
	letter-spacing: -0.025em;
}

.username {
	font-size: 0.9rem;
	color: #e11d48;
}

.form-group {
	margin-bottom: 1rem;
}

.form-group label {
	display: block;
	margin-bottom: 0.4rem;
	font-size: 0.875rem;
	font-weight: 600;
	color: #374151;
}

.form-group input,
.form-group select {
	width: 100%;
	padding: 0.75rem 1rem;
	font-size: 0.95rem;
	color: #1f2937;
	background-color: #f9fafb;
	border: 1.5px solid #e5e7eb;
	border-radius: 8px;
	outline: none;
	box-sizing: border-box;
	transition: all 0.2s ease-in-out;
}

.form-group input::placeholder {
	color: #9ca3af;
}

.form-group input:focus,
.form-group select:focus {
	border-color: #e11d48;
	background-color: #ffffff;
	box-shadow: 0 0 0 4px rgba(225, 29, 72, 0.1);
}

.form-actions {
	display: flex;
	justify-content: flex-end;
	gap: 0.75rem;
	margin-top: 1.5rem;
}

.form-actions button {
	padding: 0.6rem 1.2rem;
	border: none;
	border-radius: 8px;
	font-size: 0.9rem;
	font-weight: 600;
	cursor: pointer;
}

.cancel-btn {
	background: #f3f4f6;
	color: #374151;
}

.cancel-btn:hover {
	background: #e5e7eb;
}

.submit-btn {
	background: #e11d48;
	color: #ffffff;
}

.submit-btn:hover {
	background: #be123c;
}

.submit-btn:disabled {
	opacity: 0.6;
	cursor: not-allowed;
}
</style>
