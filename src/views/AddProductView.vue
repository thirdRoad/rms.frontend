<script setup>
import AddProductForm from '@/components/AddProductForm.vue'
import { productsService } from '@/services/products'
import { categoryService } from '@/services/category'
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'

const router = useRouter()
const categories = ref([])

const handleAddProduct = async (data) => {
  await productsService.createProduct(data)
  router.push({ name: 'products' })
}
const fetchCategories = async () => {
  categories.value = await categoryService.getCategoryList()
}

onMounted(() => {
  fetchCategories()
})
</script>

<template>
  <div class="add-category-container">
    <div class="add-category-wrapper">
      <main class="form-section">
        <AddProductForm :categories="categories" @submit-add-product="handleAddProduct" />
      </main>
    </div>
  </div>
</template>
