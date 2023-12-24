import { ReversePasswordWithHashtag } from "./ReversePasswordWithHashtag"

describe('ReversePasswordWithHastag', () => {
    it('Should reverse a password with hastag', () => {
        const reversePassword = new ReversePasswordWithHashtag()
        const password = '1234'
        const reversedPassword = reversePassword.reverse(password)
        expect(reversedPassword).toBe('4#3#2#1')
    })
})