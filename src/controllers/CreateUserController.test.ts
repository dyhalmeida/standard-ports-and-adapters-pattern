import axios from 'axios'
import { User } from "../core/user/entity/user"

let baseUrl = ''

describe.skip('CreateUserController', () => {

    beforeEach(() => {
        baseUrl = 'http://localhost:3001'
    })

    it('Should create a user that does not exist', async () => {
        const user: Omit<User, 'id'> = {
            name: 'any_name',
            email: 'any_email@mail11.com',
            password: '1234'
        }
        const res = await axios.post(`${baseUrl}/user`, user)
        expect(res.status).toBe(201)
    })

    it('Should throw a 400 error if the user email already exists', async () => {
        const user: Omit<User, 'id'> = {
            name: 'any_name',
            email: 'any_email@mail11.com',
            password: '1234'
        }
        await expect(axios.post(`${baseUrl}/user`, user)).rejects.toThrow()
    })
})
