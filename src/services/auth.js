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

	async getMe() {
		const response = await api.get('/auth/me')
		return response.data.data
	}

	async logout() {
		try {
			await api.post('/auth/logout', {})
		} catch (error) {
			console.error('We have a trouble with logout.')
			console.log(error)
		} finally {
			localStorage.removeItem('access_token')
		}
	}
}

export const authService = new AuthService()
