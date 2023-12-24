import { EncryptPassword } from "../../../adapters/EncryptPassword"
import { JwtTokenAdapter } from "../../../adapters/JwtTokenAdapter"
import { UserMemoryRepository } from "../../../adapters/UserMemoryRepository"
import { CreateUserUsecase } from "./CreateUserUsecase"
import { SignInUserUsecase } from "./SignInUserUsecase"

describe('SignUserUsecase', () => {

    it('Should enter with correct email and password', async () => {
        const userRepository = new UserMemoryRepository()
        const reverseProvider = new EncryptPassword()
        const tokenProvider = new JwtTokenAdapter('secret')
        const createUserUsecae = new CreateUserUsecase(userRepository, reverseProvider)
        
        const body = {
            name: 'any_name',
            email: 'any_email@mail.com',
            password: '1234'
        }

        await createUserUsecae.execute(body)

        const signUserUsecase = new SignInUserUsecase(userRepository, reverseProvider, tokenProvider)

        const data = await signUserUsecase.execute(body)

        expect(data.user.name).toBe(body.name)
        expect(data.user.email).toBe(body.email)
        expect(data.user.password).toBeUndefined()
        expect(data).toHaveProperty('token')
    })
})