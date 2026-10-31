<script setup>
defineProps({
  order: { type: Object, required: true },
})
const emit = defineEmits(['done', 'cancel'])

function formatTime(dateString) {
  return new Date(dateString).toLocaleTimeString('tr-TR', {
    hour: '2-digit',
    minute: '2-digit',
  })
}
</script>

<template>
  <div class="order-card" :class="`status-${order.status}`">
    <div class="order-meta">
      <span>#{{ order.id }}</span>
      <span>{{ formatTime(order.time) }}</span>
    </div>

    <ul class="order-items">
      <li v-for="item in order.items" :key="item.product_id">
        {{ item.product_name }} x {{ item.quantity }}
      </li>
    </ul>

    <div class="order-status">
      <button
        class="btn-done"
        :class="{ active: order.status === 'done' }"
        @click="emit('done', order.id)"
      >
        Done
      </button>
      <button
        class="btn-cancel"
        :class="{ active: order.status === 'cancelled' }"
        @click="emit('cancel', order.id)"
      >
        Cancel
      </button>
    </div>
  </div>
</template>

<style scoped>
.order-card {
  display: flex;
  flex-direction: column;
  padding: 14px 16px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
}

.status-preparation {
  border-left: 4px solid #f59e0b;
}

.status-done {
  border-left: 4px solid #22c55e;
}

.status-cancelled {
  border-left: 4px solid #e11d48;
}

.order-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: 0.8rem;
  color: #6b7280;
}

.order-meta span:first-child {
  font-weight: 600;
  color: #111827;
}

.order-items {
  flex: 1;
  margin: 8px 0 0;
  padding: 0;
  list-style: none;
}

.order-items li {
  padding: 6px 0;
  border-bottom: 1px dashed #e5e7eb;
  font-size: 0.95rem;
  color: #1f2937;
}

.order-items li:last-child {
  border-bottom: none;
}

.order-status {
  display: flex;
  justify-content: flex-end;
  gap: 6px;
  margin-top: 12px;
}

.order-status button {
  padding: 4px 12px;
  font-size: 0.8rem;
  font-weight: 500;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background: #ffffff;
  color: #4b5563;
  cursor: pointer;
  transition: background-color 0.15s ease;
}

.btn-done:hover,
.btn-done.active {
  background: #22c55e;
  border-color: #22c55e;
  color: #ffffff;
}

.btn-cancel:hover,
.btn-cancel.active {
  background: #e11d48;
  border-color: #e11d48;
  color: #ffffff;
}
</style>
