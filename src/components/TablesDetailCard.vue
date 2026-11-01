<script setup>
defineProps({
  table: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['order', 'change-table'])
</script>

<template>
  <div class="table-detail-card">
    <div class="table-info">
      <div class="card-header">
        <h2>Table #{{ table.id }}</h2>
        <span 
          class="status-badge" 
          :class="{ 
            occupied: table.status?.toLowerCase() === 'occupied' || table.status === true, 
            available: table.status?.toLowerCase() === 'available' || table.status === false 
          }"
        >
          {{ table.status }}
        </span>
      </div>
      <p class="table-meta">Manage table orders and status options</p>
    </div>

    <div class="table-actions">
      <button
        class="order-btn"
        @click="emit('order')"
      >
        Place Order
      </button>

      <button
        class="change-table-btn"
        @click="emit('change-table')"
      >
        Change Table
      </button>
    </div>
  </div>
</template>

<style scoped>
.table-detail-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.75rem;
  border: 1.5px solid #e5e7eb;
  border-radius: 12px;
  background: #ffffff;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  width: 100%;
  max-width: 700px;
  box-sizing: border-box;
}

.table-info {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.card-header h2 {
  margin: 0;
  font-size: 1.35rem;
  font-weight: 700;
  color: #111827;
}

.status-badge {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 20px;
  background-color: #f3f4f6;
  color: #4b5563;
  text-transform: capitalize;
}

.status-badge.available {
  background-color: #ecfdf5;
  color: #059669;
}

.status-badge.occupied {
  background-color: #fff1f2;
  color: #e11d48;
}

.table-meta {
  margin: 0;
  font-size: 0.9rem;
  color: #6b7280;
}

.table-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.table-actions button {
  padding: 0.7rem 1.25rem;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.order-btn {
  background: #e11d48;
  color: #fff;
}

.order-btn:hover {
  background: #be123c;
}

.change-table-btn {
  background: #f3f4f6;
  color: #374151;
  border: 1.5px solid #e5e7eb;
}

.change-table-btn:hover {
  background: #e5e7eb;
  border-color: #d1d5db;
}

@media (max-width: 550px) {
  .table-detail-card {
    flex-direction: column;
    align-items: stretch;
    gap: 1.25rem;
  }

  .table-actions {
    width: 100%;
  }

  .table-actions button {
    flex: 1;
  }
}
</style>