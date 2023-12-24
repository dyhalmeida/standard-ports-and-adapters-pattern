import { ITransactionRepository } from '../core/ports/TransactionRepository.interface';
import { Transaction } from '../core/transaction/entity/transaction';
import connection from '../database/connection';


export class TransactionKnexRepository implements ITransactionRepository {

    async create(transaction: Transaction): Promise<void> {
        return await connection.table('transaction').insert({
            ...transaction,
            expiration: transaction.expiration.toISOString(),
        })
    }

    async update(transaction: Transaction): Promise<void> {
        return await connection
            .table('transaction')
            .where('id', transaction.id)
            .update({
                ...transaction,
                expiration: transaction.expiration.toISOString(),
            })
    }

    async findById(userId: string, transactionId: string): Promise<Transaction | null> {
        const [transaction] = await connection
            .table('transaction')
            .where({
                id: transactionId,
                userId
            })
        if(!transaction) return null
        return transaction
    }

    async findByMonth(userId: string, year: number, month: number): Promise<Transaction[]> {
        return await connection
            .table('transaction')
            .where('userId', userId)
            .whereRaw('extract(year from expiration) = ?', year)
            .whereRaw('extract(month from expiration) = ?', month)
    }
}