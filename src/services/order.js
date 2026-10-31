import { api } from '@/api/client'

class OrderService {
  async getOrderList() {
    const response = await api.get('/orders/')
    return response.data.data
  }

  async getOrderDetail(orderId) {
    try {
      const response = await api.get(`/orders/${orderId}/items`)
      return response.data.data
    } catch (error) {
      if (error.response?.status === 404) {
        return []
      }
      throw error
    }
  }

  async createOrderObject() {
    const orders = await this.getOrderList()
    const finalOrders = []

    for (const order of orders) {
      const orderId = order.id
      const orderDate = order.created_at
      const orderStatus = order.status

      finalOrders.push({
        id: orderId,
        time: orderDate,
        status: orderStatus,
        items: await this.getOrderDetail(orderId),
      })
    }

    return finalOrders
  }

  async setOrderDone(orderId) {
    try {
      await api.post(`/orders/${orderId}/done`)
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }

  async setOrderCancelled(orderId) {
    try {
      await api.post(`/orders/${orderId}/cancelled`)
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }
}

export const orderService = new OrderService()
