<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { authService } from '@/services/auth'
import LoginForm from '@/components/LoginForm.vue'

const router = useRouter()
const loading = ref(false)
const message = ref('')

const handleLogin = async (data) => {
	loading.value = true
	message.value = ''

	try {
		await authService.login(data)
		router.push({ name: 'home' })
	} catch (error) {
		message.value = error.message || 'Login failed!'
	} finally {
		loading.value = false
	}
}
</script>

<template>
	<div class="login-page">
		<div class="background-overlay"></div>

		<div class="login-card">
			<div class="brand-header">
				<div class="logo-icon">🍽️</div>
				<h2>Restaurant Order System</h2>
				<p>Log in to your account to continue</p>
			</div>

			<LoginForm :loading="loading" @submit-login="handleLogin" />

			<transition name="fade">
				<div v-if="message" class="error-message">
					<span class="error-icon">⚠️</span>
					<span>{{ message }}</span>
				</div>
			</transition>
		</div>
	</div>
</template>

<style scoped>
.login-page {
	position: relative;
	min-height: 100vh;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	background-image: url('/mainFoto.avif');
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
	padding: 1.5rem;
	box-sizing: border-box;
}

.background-overlay {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(15, 23, 42, 0.55);
	backdrop-filter: blur(4px);
	z-index: 1;
}

.login-card {
	position: relative;
	z-index: 2;
	width: 100%;
	max-width: 420px;
	background: rgba(255, 255, 255, 0.95);
	padding: 2.5rem 2rem;
	border-radius: 16px;
	box-shadow:
		0 20px 25px -5px rgba(0, 0, 0, 0.2),
		0 10px 10px -5px rgba(0, 0, 0, 0.1);
	box-sizing: border-box;
}

.brand-header {
	text-align: center;
	margin-bottom: 2rem;
}

.logo-icon {
	font-size: 2.5rem;
	margin-bottom: 0.5rem;
}

.brand-header h2 {
	margin: 0;
	font-size: 1.5rem;
	font-weight: 700;
	color: #111827;
}

.brand-header p {
	margin-top: 0.4rem;
	font-size: 0.875rem;
	color: #6b7280;
}

.error-message {
	margin-top: 1.25rem;
	padding: 0.75rem 1rem;
	background-color: #fef2f2;
	border: 1px solid #fecaca;
	color: #dc2626;
	border-radius: 8px;
	font-size: 0.875rem;
	display: flex;
	align-items: center;
	gap: 0.5rem;
}

.fade-enter-active,
.fade-leave-active {
	transition:
		opacity 0.3s ease,
		transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
	transform: translateY(-6px);
}
</style>
