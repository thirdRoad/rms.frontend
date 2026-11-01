<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { productsService } from '@/services/products'
import { orderService } from '@/services/order'
import ProductCard from '@/components/ProductCard.vue'
import SelectedProduct from '@/components/SelectedProduct.vue'

const route = useRoute()
const router = useRouter()

const products = ref([])
const selectedProduct = ref(null)
const orderItems = ref([])

const fetchProducts = async () => {
    products.value = await productsService.getProductList()
}

const selectProduct = (product) => {
  selectedProduct.value = product
}

const saveOrderItem = (quantity) => {
  const existingItem = orderItems.value.find(
    item => item.product_id === selectedProduct.value.id
  )

  if (existingItem) {
    existingItem.quantity += quantity
  } else {
    orderItems.value.push({
      product_id: selectedProduct.value.id,
      quantity: quantity,
    })
  }

  selectedProduct.value = null
}

const removeOrderItem = (productId) => {
  orderItems.value = orderItems.value.filter(
    item => item.product_id !== productId
  )
}

const createOrder = async () => {
  if (orderItems.value.length === 0) return

  const orderData = {
    user_id: 1,
    table_id: Number(route.params.id),
    items: orderItems.value,
  }
  await orderService.createOrder(orderData)
  router.push({ name: 'tables' })
}

onMounted(fetchProducts)
</script>

<template>
  <div class="order-page-container">
    <div class="order-wrapper">
      <div class="page-header">
        <h1>Table #{{ route.params.id }} - Order Management</h1>
        <p>Select products from the menu and add them to the order list</p>
      </div>

      <div class="order-container">
        <!-- Left Side: Selected Product Form or Instruction -->
        <div class="selected-product-section">
          <SelectedProduct
            v-if="selectedProduct"
            :product="selectedProduct"
            @save="saveOrderItem"
          />
          <div v-else class="select-prompt">
            <h3>Select a Product</h3>
            <p>Click on any product from the right menu to specify quantity and add it to the order.</p>
          </div>
        </div>

        <!-- Right Side: Product List -->
        <div class="product-list-section">
          <h3 class="section-title">Menu Items</h3>
          <div class="products-grid">
            <ProductCard
              v-for="product in products"
              :key="product.id"
              :product="product"
              @click="selectProduct(product)"
            />
          </div>
        </div>
      </div>

      <!-- Order Summary / Cart List -->
      <div class="order-items-card">
        <h2>Order Summary</h2>

        <div v-if="orderItems.length === 0" class="empty-order">
          <p>No items added to this order yet.</p>
        </div>

        <div v-else class="order-list">
          <div
            v-for="item in orderItems"
            :key="item.product_id"
            class="order-item"
          >
            <span class="item-name">
              {{ products.find(p => p.id === item.product_id)?.name }}
            </span>
            <span class="item-qty">Quantity: <strong>{{ item.quantity }}</strong></span>

            <button class="remove-btn" @click="removeOrderItem(item.product_id)">
              Remove
            </button>
          </div>
        </div>

        <button
          class="submit-order-btn"
          :disabled="orderItems.length === 0"
          @click="createOrder"
        >
          Create Order
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.order-page-container {
  min-height: calc(100vh - 70px);
  display: flex;
  justify-content: center;
  padding: 2.5rem 1.5rem;
  background-color: #f9fafb;
  box-sizing: border-box;
}

.order-wrapper {
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.page-header {
  text-align: center;
}

.page-header h1 {
  font-size: 2rem;
  font-weight: 700;
  color: #111827;
  margin: 0;
  letter-spacing: -0.025em;
}

.page-header p {
  font-size: 0.95rem;
  color: #6b7280;
  margin-top: 0.4rem;
}

.order-container {
  display: grid;
  grid-template-columns: 380px 1fr;
  gap: 1.5rem;
  align-items: start;
}

.selected-product-section,
.product-list-section,
.order-items-card {
  background: white;
  padding: 1.75rem;
  border-radius: 12px;
  border: 1.5px solid #e5e7eb;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}

.select-prompt {
  text-align: center;
  padding: 3rem 1rem;
  color: #6b7280;
}

.prompt-icon {
  font-size: 2.5rem;
  margin-bottom: 0.75rem;
}

.select-prompt h3 {
  color: #111827;
  font-size: 1.15rem;
  margin: 0 0 0.5rem;
}

.select-prompt p {
  font-size: 0.9rem;
  margin: 0;
}

.section-title {
  margin-top: 0;
  margin-bottom: 1.25rem;
  font-size: 1.15rem;
  font-weight: 700;
  color: #111827;
}

.product-list-section {
  display: flex;
  flex-direction: column;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  max-height: 450px;
  overflow-y: auto;
  padding-right: 4px;
}

/* Custom scrollbar */
.products-grid::-webkit-scrollbar {
  width: 5px;
}
.products-grid::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 4px;
}
.products-grid::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

.order-items-card {
  margin-top: 0.5rem;
}

.order-items-card h2 {
  margin-top: 0;
  margin-bottom: 1.25rem;
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
}

.empty-order {
  text-align: center;
  color: #6b7280;
  padding: 1rem 0;
}

.order-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  max-height: 250px;
  overflow-y: auto;
}

.order-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}

.item-name {
  font-weight: 600;
  color: #1f2937;
}

.item-qty {
  color: #4b5563;
  font-size: 0.9rem;
}

.remove-btn {
  background-color: #fef2f2;
  color: #dc2626;
  border: 1px solid #fecaca;
  padding: 0.35rem 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.remove-btn:hover {
  background-color: #dc2626;
  color: #ffffff;
}

.submit-order-btn {
  width: 100%;
  padding: 0.85rem;
  font-size: 1rem;
  font-weight: 600;
  color: #ffffff;
  background-color: #e11d48;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out, transform 0.1s ease;
}

.submit-order-btn:hover {
  background-color: #be123c;
}

.submit-order-btn:disabled {
  background-color: #d1d5db;
  cursor: not-allowed;
}

@media (max-width: 900px) {
  .order-container {
    grid-template-columns: 1fr;
  }
}
</style>