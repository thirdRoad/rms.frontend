<script setup>
defineProps({
  product: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class="product-card">
    <div class="card-info">
      <h4>{{ product.name }}</h4>
      <p class="price">{{ product.price }} ₺</p>
    </div>
    <button type="button" class="select-btn">Select</button>
  </div>
</template>

<style scoped>
.product-card {
  background: #ffffff;
  border: 1.5px solid #e5e7eb;
  border-radius: 10px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.75rem;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.product-card:hover {
  border-color: #e11d48;
  transform: translateY(-2px);
  box-shadow: 0 8px 15px -4px rgba(225, 29, 72, 0.1);
}

.card-info h4 {
  margin: 0 0 0.25rem;
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
}

.card-info .price {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 700;
  color: #e11d48;
}

.select-btn {
  width: 100%;
  padding: 0.45rem;
  background-color: #f3f4f6;
  color: #374151;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.product-card:hover .select-btn {
  background-color: #e11d48;
  color: #ffffff;
  border-color: #e11d48;
}
</style>