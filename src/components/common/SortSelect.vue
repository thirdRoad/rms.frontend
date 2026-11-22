<script setup>
import { ref, useId } from 'vue'

defineProps({
	options: { type: Array, required: true },
	label: { type: String, default: 'Sort by' },
	defaultLabel: { type: String, default: 'Default' },
})

const emit = defineEmits(['sort'])

const selectId = useId()
const selected = ref('')

const sort = () => {
	emit('sort', selected.value)
}
</script>

<template>
	<div class="sort-select">
		<label :for="selectId" class="sr-only">{{ label }}</label>
		<select :id="selectId" v-model="selected" @change="sort">
			<option value="">{{ defaultLabel }}</option>
			<option v-for="option in options" :key="option.value" :value="option.value">
				{{ option.label }}
			</option>
		</select>
	</div>
</template>

<style scoped>
.sr-only {
	position: absolute;
	width: 1px;
	height: 1px;
	padding: 0;
	margin: -1px;
	overflow: hidden;
	clip: rect(0, 0, 0, 0);
	white-space: nowrap;
	border: 0;
}

select {
	padding: 0.65rem 0.9rem;
	font-size: 0.9rem;
	color: #1f2937;
	background-color: #ffffff;
	border: 1.5px solid #e5e7eb;
	border-radius: 8px;
	outline: none;
	cursor: pointer;
	transition:
		border-color 0.2s ease,
		box-shadow 0.2s ease;

	&:focus {
		border-color: #e11d48;
		box-shadow: 0 0 0 4px rgba(225, 29, 72, 0.1);
	}
}

@media (max-width: 576px) {
	.sort-select,
	select {
		width: 100%;
	}
}
</style>
