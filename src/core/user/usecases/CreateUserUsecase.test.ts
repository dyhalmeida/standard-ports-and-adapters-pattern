import { CreateUserUsecase } from "./CreateUserUsecase"

import { ReversePassword } from "../../../adapters/ReversePassword"
import { ReversePasswordWithHashtag } from "../../../adapters/ReversePasswordWithHashtag"
import { UserMemoryRepository } from "../../../adapters/UserMemoryRepository"
import { EncryptPassword } from "../../../adapters/EncryptPassword"
import { UserKnexRepository } from "../../../adapters/UserKnexRepository"

describe('CreateUserUsecase', () => {
    it('Should create a user with name, email and reverse password', async () => {
        const repository = new UserMemoryRepository()
        const reverseProvider = new ReversePassword()
        const usecase = new CreateUserUsecase(repository, reverseProvider)
        const user = await usecase.execute({
            name: 'any_name',
            email: 'any_email@mail.com',
            password: '1234'
        })
        expect(user).toHaveProperty('id')
        expect(user.name).toBe('any_name')
        expect(user.email).toBe('any_email@mail.com')
        expect(user.password).toBe('4321')
    })

    it('Should create a user with name, email and reverse password with hashtag', async () => {
        const repository = new UserMemoryRepository()
        const reverseProvider = new ReversePasswordWithHashtag()
        const usecase = new CreateUserUsecase(repository, reverseProvider)
        const user = await usecase.execute({
            name: 'any_name',
            email: 'any_email@mail2.com',
            password: '1234'
        })
        expect(user).toHaveProperty('id')
        expect(user.name).toBe('any_name')
        expect(user.email).toBe('any_email@mail2.com')
        expect(user.password).toBe('4#3#2#1')
    })

    it('Should create a user with name, email and encrypted password', async () => {
        const repository = new UserMemoryRepository()
        const reverseProvider = new EncryptPassword()
        const usecase = new CreateUserUsecase(repository, reverseProvider)
        const user = await usecase.execute({
            name: 'any_name',
            email: 'any_email@mail3.com',
            password: 'any_password'
        })
        expect(user).toHaveProperty('id')
        expect(user.name).toBe('any_name')
        expect(user.email).toBe('any_email@mail3.com')
        expect(reverseProvider.compare('any_password', user.password!)).toBeTruthy()
    })

    it.skip('Should create a user with name, email and encrypted password in real database', async () => {
        const repository = new UserKnexRepository()
        const reverseProvider = new EncryptPassword()
        const usecase = new CreateUserUsecase(repository, reverseProvider)
        const user = await usecase.execute({
            name: 'any_name',
            email: 'any_email',
            password: 'any_password'
        })
        expect(user).toHaveProperty('id')
        expect(user.name).toBe('any_name')
        expect(user.email).toBe('any_email')
        expect(reverseProvider.compare('any_password', user.password!)).toBeTruthy()
    })

    it('An error should be thrown when registering a user with the same email', async () => {
        const repository = new UserMemoryRepository()
        const reverseProvider = new EncryptPassword()
        const usecase = new CreateUserUsecase(repository, reverseProvider)
        const user = {
            name: 'any_name',
            email: 'any_email@mail10.com',
            password: 'any_password'
        }
        await usecase.execute(user)

        await expect(usecase.execute(user)).rejects.toThrowError('User already exists')
    })
})