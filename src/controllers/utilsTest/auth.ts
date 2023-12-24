import axios from "axios"

const baseUrl = 'http://localhost:3001'

export const getAuthorization = async () => {
    const response = await axios.post(`${baseUrl}/login`, {
        name: 'Diego',
        password: '1234'
    })
    return {
        headers: {
            Authorization: `Bearer ${response.data.token}`
        }
    }
}
