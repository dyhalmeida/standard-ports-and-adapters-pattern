import axios from 'axios'
import { getAuthorization } from './utilsTest/auth'
import { Transaction } from '../core/transaction/entity/transaction'

let baseUrl = ''

describe.skip('CreateTransactionController', () => {

    beforeEach(() => {
        baseUrl = 'http://localhost:3001'
    })

    it('Should create a transaction', async () => {
        const headers = await getAuthorization()
        const transaction: Transaction = {
            description: 'Conta de luz',
            value: -100,
            expiration: new Date('2023-01-01'),
            userId: '304566d4-6176-44fb-b55c-623bd747ac41'
        }
        let res = await axios.post(`${baseUrl}/transaction`, transaction, headers)
        expect(res.status).toBe(200)
    })
})
