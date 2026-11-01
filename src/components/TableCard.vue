<script setup>
defineProps({
  table: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class="table-card">
    <div class="card-top">
      <span class="table-title">Table #{{ table.id }}</span>
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
  </div>
</template>

<style scoped>
.table-card {
  background: #ffffff;
  border: 1.5px solid #e5e7eb;
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
  cursor: pointer;
}

.table-card:hover {
  border-color: #e11d48;
  transform: translateY(-2px);
  box-shadow: 0 10px 20px -5px rgba(225, 29, 72, 0.1);
}

.card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.table-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #1f2937;
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
</style>