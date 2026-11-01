<script setup>
import { reactive, ref, onMounted, watch } from 'vue'
import { roleService } from '@/services/role'

const props = defineProps({
	show: { type: Boolean, default: false },
	loading: { type: Boolean, default: false },
	user: { type: Object, required: true },
})

const emit = defineEmits(['submit', 'close'])

const roleList = ref([])

const formData = reactive({
	username: '',
	display_name: '',
	email: '',
	password: '',
	role_id: null,
})

onMounted(async () => {
	roleList.value = await roleService.getRoleList()
})

// Fill the form with the current user every time the modal is opened.
// We edit a copy, so Cancel leaves the original user untouched.
watch(
	() => props.show,
	(isOpen) => {
		if (isOpen) {
			Object.assign(formData, {
				username: props.user.username,
				display_name: props.user.display_name,
				email: props.user.email,
				password: '',
				role_id: props.user.role?.id ?? null,
			})
		}
	},
)

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
	<div v-if="show" class="modal-overlay" @click.self="emit('close')">
		<form class="modal-content" @submit.prevent="onSubmit">
			<h2>Edit User</h2>

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

			<div class="modal-actions">
				<button type="button" class="cancel-btn" @click="emit('close')">Cancel</button>
				<button type="submit" class="submit-btn" :disabled="loading">
					{{ loading ? 'Saving...' : 'Save' }}
				</button>
			</div>
		</form>
	</div>
</template>

<style scoped>
.modal-overlay {
	position: fixed;
	inset: 0;
	background: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 9999;
	padding: 20px;
}

.modal-content {
	width: 100%;
	max-width: 440px;
	padding: 30px;
	background: #ffffff;
	border-radius: 14px;
	box-shadow: 0 10px 35px rgba(0, 0, 0, 0.15);
	box-sizing: border-box;
}

.modal-content h2 {
	margin: 0 0 1.25rem;
	color: #111827;
	font-size: 22px;
	text-align: center;
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

.modal-actions {
	display: flex;
	gap: 12px;
	margin-top: 1.5rem;
}

.modal-actions button {
	flex: 1;
	padding: 11px 18px;
	border: none;
	border-radius: 8px;
	font-size: 14px;
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
