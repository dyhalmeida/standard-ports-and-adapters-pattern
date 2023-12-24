import { Identifier } from "../core/shared/Identifier"
import { UserMemoryRepository } from "./UserMemoryRepository"

describe('UserMemoryRepository', () => {
    it('Should create a user with name, email and password', async () => {
        const userMemoryRepository = new UserMemoryRepository()
        await userMemoryRepository.create({
            id: Identifier.generate(),
            name: 'any_name',
            email: 'any_email',
            password: 'any_password'
        })
    })
})