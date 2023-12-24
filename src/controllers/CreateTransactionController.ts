import { Express, NextFunction, Request, Response } from 'express'
import { CreateOrUpdateTransactionUsecase } from '../core/transaction/usecases/CreateTransactionUsecase';
import { User } from '../core/user/entity/user';

interface IMidleware {
    (req: Request, res: Response, next: NextFunction): Promise<void>;
}

export class CreateTransactionController {
    constructor(
        private server: Express,
        private createOrUpdateTransactionUsecase: CreateOrUpdateTransactionUsecase,
        ...middleware: IMidleware[]
    ){
        const createOrUpdateTransaction = async (req: Request, res: Response) => {
            try {
                const transaction = {
                    description: req.body.description as string,
                    value: +req.body.value as number,
                    expiration: new Date(req.body.expiration),
                    userId: req.body.userId as string
                }
                await this.createOrUpdateTransactionUsecase.execute({
                    transaction,
                    user: (req as any)?.user as User,
                    id: req.params.id
                })
                res.status(200).json()
            } catch (error: any) {
                res.status(400).send(error.message)
            }
        }
        this.server.post('/transaction', middleware, createOrUpdateTransaction)
        this.server.post('/transaction/:id', middleware, createOrUpdateTransaction)
    }
}