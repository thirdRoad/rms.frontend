import { api } from '@/api/client'

class CategoryService {
	async getCategoryList() {
		const response = await api.get('/categories/')
		return response.data.data
	}

	async createCategory(body) {
		const response = await api.post('/categories/', body)
		return response.data.data
	}
}

export const categoryService = new CategoryService()
