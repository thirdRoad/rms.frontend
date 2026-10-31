<script setup>
import { ref, onMounted } from 'vue'
import { productsService } from '@/services/products'
import ProductCard from '@/components/ProductCard.vue'
import CategoryFilter from '@/components/CategoryFilter.vue'
import { useRouter, RouterLink } from 'vue-router'

const router = useRouter()
const products = ref([])

const fetchProducts = async () => {
  const data = await productsService.getProductList()
  products.value = data
  console.log(data)
}

const goToAddCategory = () => {
  router.push({ name: 'add-category' })
}

const goToAddProduct = () => {
  router.push({ name: 'add-product' })
}

onMounted(() => {
  fetchProducts()
})
</script>

<template>
  <div class="products-container">
    <div class="products-wrapper">
      <div class="page-header">
        <div class="header-titles">
          <h1>Products</h1>
          <p>Manage your menu items and product list</p>
        </div>

        <div class="actions">
          <button @click="goToAddProduct" class="action-btn">Add Product</button>
          <button @click="goToAddCategory" class="action-btn secondary">Add Category</button>
        </div>
      </div>

      <div class="content-layout">
        <aside class="sidebar-section">
          <CategoryFilter />
        </aside>

        <main class="products-scroll-area">
          <div class="products-grid">
            <RouterLink
              v-for="product in products"
              :key="product.id"
              :to="`/products/${product.id}`"
              class="product-card-link"
            >
              <ProductCard :product="product" />
            </RouterLink>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<style scoped>
.products-container {
  min-height: calc(100vh - 70px);
  display: flex;
  justify-content: center;
  padding: 2.5rem 1.5rem;
  background-color: #f9fafb;
  box-sizing: border-box;
}

.products-wrapper {
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
}

.header-titles h1 {
  font-size: 2rem;
  font-weight: 700;
  color: #111827;
  margin: 0;
  letter-spacing: -0.025em;
}

.header-titles p {
  font-size: 0.95rem;
  color: #6b7280;
  margin-top: 0.4rem;
}

.actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.action-btn {
  padding: 0.7rem 1.25rem;
  border: none;
  border-radius: 8px;
  background-color: #e11d48;
  color: white;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.9rem;
  transition:
    background-color 0.2s ease,
    transform 0.1s ease;
}

.action-btn:hover {
  background-color: #be123c;
}

.action-btn:active {
  transform: scale(0.98);
}

.action-btn.secondary {
  background-color: #ffffff;
  color: #374151;
  border: 1.5px solid #e5e7eb;
}

.action-btn.secondary:hover {
  background-color: #f3f4f6;
  border-color: #d1d5db;
}

/* Two-column layout: Sidebar on left, products grid on right */
.content-layout {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
}

.sidebar-section {
  flex-shrink: 0;
}

/* Scrollable area for products */
.products-scroll-area {
  flex: 1;
  max-height: calc(100vh - 220px);
  overflow-y: auto;
  padding-right: 6px;
  padding-bottom: 1rem;
}

/* Modern scrollbar styling */
.products-scroll-area::-webkit-scrollbar {
  width: 6px;
}

.products-scroll-area::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 4px;
}

.products-scroll-area::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

.products-scroll-area::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Responsive Grid layout for cards */
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1.25rem;
}

.product-card-link {
  text-decoration: none;
  color: inherit;
  display: block;
  border-radius: 12px;
  transition: transform 0.2s ease;
}

/* Responsive adjustment for tablet/mobile */
@media (max-width: 768px) {
  .content-layout {
    flex-direction: column;
  }

  .sidebar-section {
    width: 100%;
  }

  .products-scroll-area {
    width: 100%;
    max-height: none;
  }
}
</style>
