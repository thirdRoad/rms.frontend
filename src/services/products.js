import { api } from '@/api/client'

class ProductsService {
  async getProductList() {
    const response = await api.get('/products/')
    console.log('data', response.data.data)
    return response.data.data
  }

  async createProduct(body) {
    await api.post('/products/', body, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
  async getProduct(id) {
    const response = await api.get(`/products/${id}`)
    return response.data.data
  }
  async deleteProduct(id) {
    await api.delete(`/products/${id}`)
  }
  async updateProduct(id, data) {
    const response = await api.patch(`/products/${id}`, data)
    return response.data
  }
}

export const productsService = new ProductsService()
