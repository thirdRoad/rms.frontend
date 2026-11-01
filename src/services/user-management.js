import { api } from '@/api/client'

class UserManagementService {
	async getUserList() {
		const response = await api.get('/users/')
		return response.data.data
	}

	async getUser(userId) {
		const response = await api.get(`/users/${userId}`)
		return response.data.data
	}

	async createUser(body) {
		const response = await api.post('/users/', body)
		return response.data.data
	}

	async updateUser(userId, body) {
		const response = await api.patch(`/users/${userId}`, body)
		return response.data.data
	}

	async deleteUser(userId) {
		await api.delete(`/users/${userId}`)
	}
}

export const userManagementService = new UserManagementService()
