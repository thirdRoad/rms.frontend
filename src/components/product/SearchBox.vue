<script setup>
import { ref } from 'vue'

const searchValue = ref('')

const emit = defineEmits(['search', 'deleteSearchValue'])

const searchProducts = () => {
	emit('search', searchValue.value)
}

const deleteSearchValue = () => {
	searchValue.value = ''
	emit('deleteSearchValue')
	searchProducts()
}
</script>

<template>
	<div class="search-box">
		<label for="site-search" class="sr-only">Search product</label>
		<div class="search-input-group">
			<input
				id="site-search"
				type="search"
				v-model="searchValue"
				placeholder="Search products..."
				@keydown.enter.prevent="searchProducts"
			/>
			<button type="button" class="search-btn" @click="searchProducts">Search</button>
		</div>
		<a v-if="searchValue" href="#" class="clear-link" @click.prevent="deleteSearchValue"> Clear </a>
	</div>
</template>

<style scoped>
.search-box {
	display: flex;
	align-items: center;
	gap: 0.6rem;
}

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

.search-input-group {
	display: flex;
	align-items: center;
	background-color: #ffffff;
	border: 1.5px solid #e5e7eb;
	border-radius: 8px;
	overflow: hidden;
	transition:
		border-color 0.2s ease,
		box-shadow 0.2s ease;

	&:focus-within {
		border-color: #e11d48;
		box-shadow: 0 0 0 4px rgba(225, 29, 72, 0.1);
	}

	input[type='search'] {
		border: none;
		outline: none;
		padding: 0.65rem 0.9rem;
		font-size: 0.9rem;
		color: #1f2937;
		background: transparent;
		min-width: 200px;

		&::placeholder {
			color: #9ca3af;
		}

		&::-webkit-search-cancel-button {
			cursor: pointer;
		}
	}
}

.search-btn {
	padding: 0.65rem 1rem;
	border: none;
	background-color: #e11d48;
	color: #ffffff;
	font-size: 0.875rem;
	font-weight: 600;
	cursor: pointer;
	transition: background-color 0.2s ease;

	&:hover {
		background-color: #be123c;
	}

	&:active {
		background-color: #9f1239;
	}
}

.clear-link {
	font-size: 0.85rem;
	font-weight: 600;
	color: #6b7280;
	text-decoration: none;
	padding: 0.35rem 0.4rem;
	border-radius: 6px;
	transition:
		color 0.2s ease,
		background-color 0.2s ease;

	&:hover {
		color: #e11d48;
		background-color: #fff1f2;
	}
}

@media (max-width: 576px) {
	.search-box {
		width: 100%;
		flex-wrap: wrap;
	}

	.search-input-group {
		flex: 1;

		input[type='search'] {
			width: 100%;
			min-width: 0;
		}
	}
}
</style>
