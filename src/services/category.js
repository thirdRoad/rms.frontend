import { api } from '@/api/client'

class CategoryService {
  async get() {
    const response = await api.get('/categories/')
    return response.data.data
  }

  async post(body) {
    await api.post('/categories/', body, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}

export const categoryService = new CategoryService()
