import axios from 'axios'
import { User } from "../core/user/entity/user"

let baseUrl = ''

describe.skip('SignInUserController', () => {

    beforeEach(() => {
        baseUrl = 'http://localhost:3001'
    })

    it('Should enter with correct email and password', async () => {
        const user: Omit<User, 'id'> = {
            name: 'any_name',
            email: 'any_email@mail.com',
            password: '1234'
        }
        let res = await axios.post(`${baseUrl}/user`, user)
        expect(res.status).toBe(201)

        res = await axios.post(`${baseUrl}/sign-in`, user)
        expect(res.status).toBe(200)
        expect(res.data.user).toHaveProperty('id')
        expect(res.data.user.name).toBe(user.name)
        expect(res.data.user.email).toBe(user.email)
        expect(res.data).toHaveProperty('token')
    })

    it('Should throw a 403 error if the user email or password is incorrect', async () => {
        const user: Omit<User, 'id' | 'name'> = {
            email: 'any_email@mail11.com',
            password: '1234'
        }
        const res = await axios.post(`${baseUrl}/sign-in`, user)
        expect(res.status).toBe(403)
    })
})
