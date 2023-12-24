import { EncryptPassword } from "./EncryptPassword"

describe('EncryptPassword', () => {
    it('Should encrypt password', () => {
        const encryptPassword = new EncryptPassword()
        const password = '1234'
        const encryptedPassword = encryptPassword.reverse(password)

        expect(encryptedPassword).not.toBe(password)
        expect(encryptPassword.compare(password, encryptedPassword)).toBeTruthy()
    })
})