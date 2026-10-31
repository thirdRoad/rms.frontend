import { api } from '@/api/client'

class ProductsService {
  async get() {
    const response = await api.get('/products/')
    console.log('data', response.data.data)
    return response.data.data
  }

  async post(body) {
    await api.post('/products/', body, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
  async getById(id) {
    const response = await api.get(`/products/${id}`)
    return response.data.data
  }
  async delete(id) {
    await api.delete(`/products/${id}`)
  }
  async update(id, data) {
    const response = await api.patch(`/products/${id}`, data)
    return response.data
  }
}

export const productsService = new ProductsService()
