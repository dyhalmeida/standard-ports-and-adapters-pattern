import { IUsecase } from "../../interfaces/Usecase.interface"
import { IReverseProvider } from "../../ports/ReverseProvider.interface"
import { ITokenProvider } from "../../ports/TokenProvider.interface"
import { IUserRepository } from "../../ports/UserRepository.interface"
import { User } from "../entity/user"

type InputData = Pick<User, 'email' | 'password'>
type OutputData = { user: Partial<User>, token: string }

export class SignInUserUsecase implements IUsecase<InputData, OutputData> {
    constructor(
        private userRepository: IUserRepository,
        private reverseProvider: IReverseProvider,
        private tokenProvider: ITokenProvider
    ){}

    public async execute({ email, password }: InputData): Promise<OutputData> {

        const user = await this.userRepository.findByEmail(email)

        if (!user) {
            throw new Error('User not found')
        }

        if(!this.reverseProvider.compare(password, user.password)) {
            throw new Error('User not found')
        }
       
        return {
            user: { ...user, password: undefined },
            token: this.tokenProvider.generate({
                id: user.id,
                name: user.name,
                email: user.email
            })
        }
    }
}
