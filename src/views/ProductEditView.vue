<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { productsService } from '@/services/products'
import { categoryService } from '@/services/category'
import ProductEditForm from '@/components/ProductEditForm.vue'

const route = useRoute()
const router = useRouter()

const product = ref(null)
const categories = ref([])

const fetchProduct = async (id) => {
	product.value = await productsService.getProduct(id)
}

const fetchCategories = async () => {
	categories.value = await categoryService.getCategoryList()
}

const handleEditProduct = async (updatedData) => {
	await productsService.updateProduct(route.params.id, updatedData)
	router.push({
		name: 'products',
	})
}

watch(
	() => route.params.id,
	(id) => {
		product.value = null
		fetchProduct(id)
	},
	{ immediate: true },
)

onMounted(() => {
	fetchCategories()
})
</script>

<template>
	<div class="edit-product-page">
		<h1>Edit Product</h1>
		<ProductEditForm
			v-if="product"
			:product="product"
			:categories="categories"
			@submit-edit-product="handleEditProduct"
		/>
	</div>
</template>

<style scoped>
.edit-product-page {
	width: 100%;
	padding: 24px;
}

.edit-product-page h1 {
	margin-bottom: 20px;
	font-size: 24px;
	font-weight: 600;
}
</style>
