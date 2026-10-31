<script setup>
import { ref, onMounted } from 'vue'
import { categoryService } from '@/services/category'

const categories = ref([])
const selectedCategoryId = ref(null) // Optional state to handle active click highlight

const fetchCategories = async () => {
  const data = await categoryService.get()
  categories.value = data
  console.log('categories', data)
}

const selectCategory = (id) => {
  selectedCategoryId.value = id
}

onMounted(() => {
  fetchCategories()
})
</script>

<template>
  <aside class="category-sidebar">
    <div class="sidebar-header">
      <h3>Categories</h3>
    </div>

    <nav class="category-list">
      <a
        href="#"
        class="category-item"
        :class="{ active: selectedCategoryId === null }"
        @click.prevent="selectCategory(null)"
      >
        <span>All Products</span>
      </a>

      <a
        v-for="category in categories"
        :key="category.id || category.name"
        href="#"
        class="category-item"
        :class="{ active: selectedCategoryId === category.id }"
        @click.prevent="selectCategory(category.id)"
      >
        <span>{{ category.name }}</span>
      </a>
    </nav>
  </aside>
</template>

<style scoped>
.category-sidebar {
  width: 260px;
  min-width: 260px;
  background-color: #ffffff;
  border: 1.5px solid #e5e7eb;
  border-radius: 12px;
  padding: 1.25rem 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: fit-content;
  max-height: calc(100vh - 120px);
}

.sidebar-header h3 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 700;
  color: #111827;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #f3f4f6;
}

.category-list {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  overflow-y: auto;
  padding-right: 4px;
}

/* Custom Scrollbar for Long Category Lists */
.category-list::-webkit-scrollbar {
  width: 5px;
}

.category-list::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 4px;
}

.category-list::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

/* Category Link Items */
.category-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  text-decoration: none;
  font-size: 0.925rem;
  font-weight: 500;
  color: #4b5563;
  border-radius: 8px;
  transition: all 0.2s ease-in-out;
}

.category-item:hover {
  color: #e11d48;
  background-color: #fff1f2;
}

/* Active Category State */
.category-item.active {
  color: #ffffff;
  font-weight: 600;
  background-color: #e11d48;
  box-shadow: 0 4px 12px rgba(225, 29, 72, 0.2);
}

@media (max-width: 768px) {
  .category-sidebar {
    width: 100%;
    min-width: 100%;
    max-height: none;
  }
}
</style>
