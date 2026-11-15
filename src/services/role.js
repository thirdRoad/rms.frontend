import { api } from '@/api/client'

class RoleService {
	async getRoleList() {
		const response = await api.get('/roles/')
		return response.data.data
	}
}

export const roleService = new RoleService()
