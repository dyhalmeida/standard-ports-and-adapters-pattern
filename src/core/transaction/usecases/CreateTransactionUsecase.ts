import { IUsecase } from "../../interfaces/Usecase.interface";
import { ITransactionRepository } from "../../ports/TransactionRepository.interface";
import { Identifier } from "../../shared/Identifier";
import { User } from "../../user/entity/user";
import { Transaction } from "../entity/transaction";

type InputData = {
    transaction: Transaction;
    user: User;
    id: string
} 
export class CreateOrUpdateTransactionUsecase implements IUsecase<InputData, void> {

    constructor(private transactionRepository: ITransactionRepository) {}

    async execute(data: InputData): Promise<void> {
        if (data.transaction.userId !== data.user.id) throw new Error('Unauthorized user')
       const transaction = {...data.transaction, id: data.id ?? Identifier.generate(), userId: data.user.id }
       if (!data.id) {
           await this.transactionRepository.create(transaction)
           return
        }
        await this.transactionRepository.update(transaction)
    }
}
