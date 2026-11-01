<script setup>
defineProps({
	show: {
		type: Boolean,
		default: false,
	},
	itemName: {
		type: String,
		default: 'this item',
	},
	title: {
		type: String,
		default: 'Delete Item?',
	},
})

const emit = defineEmits(['confirm', 'cancel'])
</script>

<template>
	<div v-if="show" class="modal-overlay" @click.self="emit('cancel')">
		<div class="modal-content">
			<div class="warning-icon">
				<span>!</span>
			</div>

			<h2>{{ title }}</h2>

			<p>
				Are you sure you want to delete
				<strong>{{ itemName }}</strong
				>? This action cannot be undone.
			</p>

			<div class="modal-actions">
				<button type="button" class="cancel-btn" @click="emit('cancel')">Cancel</button>

				<button type="button" class="delete-btn" @click="emit('confirm')">Delete</button>
			</div>
		</div>
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
	max-width: 420px;
	padding: 30px;
	background: #fff;
	border-radius: 14px;
	text-align: center;
	box-shadow: 0 10px 35px rgba(0, 0, 0, 0.15);
}

.warning-icon {
	width: 55px;
	height: 55px;
	margin: 0 auto 18px;
	border-radius: 50%;
	background: #fff1f0;
	color: #e11d48;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 30px;
	font-weight: 700;
}

.modal-content h2 {
	margin: 0 0 12px;
	color: #1f2937;
	font-size: 22px;
}

.modal-content p {
	margin-bottom: 25px;
	color: #6b7280;
	font-size: 14px;
	line-height: 1.6;
}

.modal-content strong {
	color: #374151;
}

.modal-actions {
	display: flex;
	justify-content: center;
	gap: 12px;
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

.delete-btn {
	background: #e11d48;
	color: #fff;
}

.delete-btn:hover {
	background: #be123c;
}
</style>
