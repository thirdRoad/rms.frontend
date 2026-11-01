import { api } from '@/api/client'

class TablesService {
	async getTableList() {
		const response = await api.get('/tables/')
		return response.data.data
	}
	async getTable(id) {
		const response = await api.get(`/tables/${id}`)
		return response.data.data
	}

	async createTable() {
		const response = await api.post('/tables/')
		return response.data.data
	}
}

export const tablesService = new TablesService()
