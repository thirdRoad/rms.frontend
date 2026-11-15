import { api } from '@/api/client'

class ProductService {
	async getProductList() {
		const response = await api.get('/products/')
		return response.data.data
	}

	async createProduct(body) {
		const response = await api.post('/products/', body)
		return response.data.data
	}

	async getProduct(id) {
		const response = await api.get(`/products/${id}`)
		return response.data.data
	}

	async updateProduct(id, data) {
		const response = await api.patch(`/products/${id}`, data)
		return response.data.data
	}

	async deleteProduct(id) {
		await api.delete(`/products/${id}`)
	}
}

export const productService = new ProductService()
