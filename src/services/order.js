import { api } from '@/api/client'

class OrderService {
	async getOrderList(params = {}) {
		const response = await api.get('/orders/', { params })
		return response.data.data
	}
	async createOrder(data) {
		const response = await api.post('/orders/', data)
		return response.data
	}


	async setOrderDone(orderId) {
		try {
			await api.post(`/orders/${orderId}/done`)
			return true
		} catch {
			return false
		}
	}

	async setOrderCancelled(orderId) {
		try {
			await api.post(`/orders/${orderId}/cancelled`)
			return true
		} catch {
			return false
		}
	}
}

export const orderService = new OrderService()
