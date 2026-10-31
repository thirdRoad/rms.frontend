<script setup>
import AddCategoryForm from '@/components/AddCategoryForm.vue'
import { categoryService } from '@/services/category'
import { useRouter } from 'vue-router'

const router = useRouter()

const handleAddCategory = async (data) => {
  await categoryService.post(data)
  router.push({ name: 'products' })
}
</script>

<template>
  <div class="add-category-container">
    <div class="add-category-wrapper">
      <div class="page-header">
        <h1>Add New Category</h1>
        <p>Create a new category to organize your products</p>
      </div>

      <main class="form-section">
        <AddCategoryForm @submit-add-category="handleAddCategory" />
      </main>
    </div>
  </div>
</template>

<style scoped>
.add-category-container {
  min-height: calc(100vh - 70px);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2.5rem 1.5rem;
  background-color: #f9fafb;
  box-sizing: border-box;
}

.add-category-wrapper {
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.page-header {
  text-align: center;

  h1 {
    font-size: 2rem;
    font-weight: 700;
    color: #111827;
    margin: 0;
    letter-spacing: -0.025em;
  }

  p {
    font-size: 0.95rem;
    color: #6b7280;
    margin-top: 0.4rem;
  }
}

.form-section {
  width: 100%;
}
</style>
