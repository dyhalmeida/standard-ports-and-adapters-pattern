import { Express } from 'express'
import { SignInUserUsecase } from '../core/user/usecases/SignInUserUsecase'

export class SignInUserController {
    constructor(
        private server: Express,
        private signInUserUsecase: SignInUserUsecase
    ){
        this.server.post('/sign-in', async (req, res) => {
            const { email, password } = req.body
           try {
                const { user, token } = await this.signInUserUsecase.execute({
                    email,
                    password
                })
                res.status(200).json({
                    user,
                    token
                })
           } catch (error: any) {
                res.status(403).send(error.message)
           }
        })
    }
}