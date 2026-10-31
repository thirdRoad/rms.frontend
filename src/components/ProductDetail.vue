<script setup>
defineProps({
  product: {
    type: Object,
    required: true,
  },
})
function formatTime(dateString) {
  return new Date(dateString).toLocaleDateString('tr-TR')
}
</script>

<template>
  <div class="product-detail-container">
    <div class="product-detail-card">
      <div class="card-header">
        <h1>{{ product.name }}</h1>
        <span class="product-id-badge">ID: {{ product.id }}</span>
      </div>

      <div class="product-info-grid">
        <div class="info-item">
          <span class="info-label">Product Name</span>
          <span class="info-value">{{ product.name }}</span>
        </div>

        <div class="info-item">
          <span class="info-label">Price</span>
          <span class="info-value price-tag">{{ Number(product.price).toFixed(2) }} ₺</span>
        </div>

        <div class="info-item">
          <span class="info-label">Stock Quantity</span>
          <span class="info-value stock-tag" :class="{ 'low-stock': product.stock <= 5 }">
            {{ product.stock }} units
          </span>
        </div>

        <div class="info-item full-width" v-if="product.created_at">
          <span class="info-label">Created At</span>
          <span class="info-value date-text">{{ formatTime(product.created_at) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-detail-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.5rem;
  width: 100%;
}

.product-detail-card {
  background: #ffffff;
  border: 1.5px solid #e5e7eb;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  width: 100%;
  max-width: 500px;
  box-sizing: border-box;

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 1.25rem;
    border-bottom: 1px solid #f3f4f6;
    margin-bottom: 1.5rem;

    h1 {
      margin: 0;
      font-size: 1.5rem;
      font-weight: 700;
      color: #111827;
      letter-spacing: -0.025em;
    }

    .product-id-badge {
      font-size: 0.8rem;
      font-weight: 600;
      color: #6b7280;
      background-color: #f3f4f6;
      padding: 4px 10px;
      border-radius: 20px;
    }
  }

  .product-info-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.25rem;

    .info-item {
      display: flex;
      flex-direction: column;
      gap: 0.35rem;

      &.full-width {
        grid-column: span 2;
      }

      .info-label {
        font-size: 0.85rem;
        font-weight: 600;
        color: #6b7280;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }

      .info-value {
        font-size: 1.05rem;
        font-weight: 600;
        color: #1f2937;

        &.price-tag {
          font-size: 1.25rem;
          font-weight: 700;
          color: #e11d48;
        }

        &.stock-tag {
          color: #059669;

          &.low-stock {
            color: #dc2626;
          }
        }

        &.date-text {
          font-size: 0.95rem;
          color: #4b5563;
          font-weight: 400;
        }
      }
    }
  }
}

@media (max-width: 480px) {
  .product-detail-card {
    padding: 1.5rem;

    .product-info-grid {
      grid-template-columns: 1fr;

      .info-item.full-width {
        grid-column: span 1;
      }
    }
  }
}
</style>
