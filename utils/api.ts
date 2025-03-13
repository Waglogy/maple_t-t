const BASE_URL = 'https://maple-server-e7ye.onrender.com/api'

export const api = {
  get: async (endpoint: string) => {
    const token = localStorage.getItem('token')
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        'Authorization': token ? `Bearer ${token}` : '',
      },
    })
    return response
  },

  post: async (endpoint: string, data: any) => {
    const token = localStorage.getItem('token')
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
      },
      body: JSON.stringify(data),
    })
    return response
  },
} 