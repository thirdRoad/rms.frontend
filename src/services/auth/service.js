import { api } from '@/api/client'

class AuthService {
  async login(body) {
    const response = await api.post('/auth/login', body, {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.data.data.access_token) {
      localStorage.setItem('access_token', response.data.data.access_token)
    }
    return response.data
  }

  async logout() {
    const token = localStorage.getItem('access_token')

    await api.post(
      '/auth/logout',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    localStorage.removeItem('access_token')
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('access_token'))
  }
}

export default new AuthService()
