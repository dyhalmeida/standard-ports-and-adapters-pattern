import { ReversePassword } from "./ReversePassword"

describe('ReversePassword', () => {
    it('Should reverse a password', () => {
        const reversePassword = new ReversePassword()
        const password = '1234'
        const reversedPassword = reversePassword.reverse(password)
        expect(reversedPassword).toBe('4321')
    })
})