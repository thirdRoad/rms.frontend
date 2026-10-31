import { api } from '@/api/client'

class CategoryService {
    async getTablesList() {
        const response = await api.get('/tables/')
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

export const categoryService = new CategoryService()
