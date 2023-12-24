import { IUsecase } from "../../interfaces/Usecase.interface"
import { IReverseProvider } from "../../ports/ReverseProvider.interface"
import { IUserRepository } from "../../ports/UserRepository.interface"
import { Identifier } from "../../shared/Identifier"
import { User } from "../entity/user"

type InputData = Omit<User, 'id'>
type OutputData = User

export class CreateUserUsecase implements IUsecase<InputData, OutputData> {
    constructor(
        private userRepository: IUserRepository,
        private reverseProvider: IReverseProvider
    ){}

    public async execute({ name, email, password }: InputData): Promise<OutputData> {

        if (await this.userRepository.findByEmail(email)) {
            throw new Error('User already exists')
        }

        const user = {
            id: Identifier.generate(),
            name,
            email,
            password: this.reverseProvider.reverse(password)
        }
        await this.userRepository.create(user)
        return user
    }
}
