<script setup>
import { reactive } from 'vue'

defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['submit-login'])

const formData = reactive({
  username: '',
  password: '',
})

// user information is being initialized...
const onSubmit = () => {
  emit('submit-login', { ...formData })
}
</script>

<template>
  <form class="login-form" @submit.prevent="onSubmit">
    <div class="form-group">
      <label for="username">User Name</label>
      <input
        id="username"
        type="text"
        v-model="formData.username"
        placeholder="Enter your username"
        required
      />
    </div>

    <div class="form-group">
      <label for="password">Password</label>
      <input
        id="password"
        type="password"
        v-model="formData.password"
        placeholder="••••••••"
        required
      />
    </div>

    <button type="submit" class="submit-btn" :disabled="loading">
      <span v-if="loading" class="spinner"></span>
      <span>{{ loading ? 'Logging in...' : 'Log in' }}</span>
    </button>
  </form>
</template>

<style scoped>
.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  width: 100%;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  text-align: left;
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
  background-color: #f9fafb;
  color: #1f2937;
  transition: all 0.2s ease-in-out;
  box-sizing: border-box;
}

.form-group input:focus {
  outline: none;
  border-color: #e11d48;
  background-color: #ffffff;
  box-shadow: 0 0 0 4px rgba(225, 29, 72, 0.1);
}

.submit-btn {
  margin-top: 0.5rem;
  width: 100%;
  padding: 0.85rem;
  font-size: 1rem;
  font-weight: 600;
  color: #ffffff;
  background-color: #e11d48;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition:
    background-color 0.2s ease-in-out,
    transform 0.1s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.submit-btn:hover:not(:disabled) {
  background-color: #be123c;
}

.submit-btn:active:not(:disabled) {
  transform: scale(0.99);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #ffffff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
