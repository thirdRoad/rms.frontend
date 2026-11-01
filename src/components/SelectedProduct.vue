<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['save'])

const quantity = ref(1)

watch(
  () => props.product,
  () => {
    quantity.value = 1
  }
)

const save = () => {
  if (!Number.isInteger(quantity.value) || quantity.value < 1) return

  emit('save', quantity.value)
}
</script>

<template>
  <div class="selected-product">
    <h3 class="product-title">{{ product.name }}</h3>

    <div class="price-tag">Unit Price: <strong>{{ product.price }} ₺</strong></div>

    <div class="form-group">
      <label for="quantity">Quantity</label>
      <input
        id="quantity"
        v-model.number="quantity"
        type="number"
        min="1"
      />
    </div>

    <div class="total-box">
      <span>Total:</span>
      <span class="total-price">{{ product.price * quantity }} ₺</span>
    </div>

    <button type="button" class="add-to-order-btn" @click="save">
      Add to Order
    </button>
  </div>
</template>

<style scoped>
.selected-product {
  display: flex;
  flex-direction: column;
  gap: 1.15krem;
}

.product-title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
}

.price-tag {
  font-size: 0.95rem;
  color: #4b5563;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin-top: 0.5rem;
}

.form-group label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
}

.form-group input {
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 0.95rem;
  border: 1.5px solid #e5e7eb;
  border-radius: 8px;
  outline: none;
  transition: all 0.2s ease-in-out;
  box-sizing: border-box;
  background-color: #f9fafb;
  color: #1f2937;
}

.form-group input:focus {
  border-color: #e11d48;
  background-color: #ffffff;
  box-shadow: 0 0 0 4px rgba(225, 29, 72, 0.1);
}

.total-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background-color: #fff1f2;
  border: 1.5px solid #fecdd3;
  border-radius: 8px;
  font-weight: 600;
  color: #4b5563;
  margin-top: 0.5rem;
}

.total-price {
  color: #e11d48;
  font-size: 1.15rem;
}

.add-to-order-btn {
  width: 100%;
  margin-top: 0.5rem;
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

.add-to-order-btn:hover {
  background-color: #be123c;
}

.add-to-order-btn:active {
  transform: scale(0.99);
}
</style>