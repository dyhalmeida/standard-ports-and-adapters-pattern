import { Transaction } from "../transaction/entity/transaction"

interface ICreateTransaction {
    create(transaction: Transaction): Promise<void>
}

interface IUpdateTransaction {
    update(transaction: Transaction): Promise<void>
}

interface IFindTransaction {
    findById(userId: string, transactionId: string): Promise<Transaction | null>
    findByMonth(userId: string, year: number, month: number): Promise<Transaction[]>
}

export interface ITransactionRepository extends ICreateTransaction, IUpdateTransaction, IFindTransaction {}