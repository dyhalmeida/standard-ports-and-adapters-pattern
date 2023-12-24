import { Identifier } from "../core/shared/Identifier"
import { UserKnexRepository } from "./UserKnexRepository"

describe('UserKnexRepository', () => {
    it.skip('Should create a user with name, email and password', async () => {
        const userKnexRepository = new UserKnexRepository()
        await userKnexRepository.create({
            id: Identifier.generate(),
            name: 'any_name',
            email: 'any_email',
            password: 'any_password'
        })
    })
})