import { JwtTokenAdapter } from "./JwtTokenAdapter"

describe('JwtTokenAdapter', () => {
    it('Should generate a valid token', () => {
        const tokenProvider = new JwtTokenAdapter('secret')
        const user = {
            id: '1',
            name: 'any_name',
            email: 'any_email@mail.com'
        }
        const token = tokenProvider.generate(user)
        const tokenValid = tokenProvider.validate(token)

        expect(typeof token).toBe('string')
        expect(token).not.toBeNull()
        expect(token).not.toBeUndefined()
        expect(tokenValid).toHaveProperty('id')
        expect(tokenValid).toHaveProperty('name')
        expect(tokenValid).toHaveProperty('email')
    })
})