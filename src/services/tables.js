import { api } from '@/api/client'

class TablesService {
	async getTablesList() {
		const response = await api.get('/tables/')
		return response.data.data
	}
	async getTable(id) {
		const response = await api.get(`/tables/${id}`)
		return response.data.data
	}

	async createTable(body) {
		await api.post('/tables/', body, {
			headers: {
				'Content-Type': 'application/json',
			},
		})
	}
}

export const tablesService = new TablesService()
