import { Express } from 'express'
import { CreateUserUsecase } from '../core/user/usecases/CreateUserUsecase';

export class CreateUserController {
    constructor(
        private server: Express,
        private createUserUsecase: CreateUserUsecase
    ){
        this.server.post('/user', async (req, res) => {
            const { name, email, password } = req.body
           try {
                await this.createUserUsecase.execute({
                    name,
                    email,
                    password
                })
                res.status(201).json()
           } catch (error: any) {
                res.status(400).send(error.message)
           }
        })
    }
}