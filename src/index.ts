import express from 'express'
import { UserMemoryRepository } from './adapters/UserMemoryRepository'
import { CreateUserUsecase } from './core/user/usecases/CreateUserUsecase'
import { EncryptPassword } from './adapters/EncryptPassword'
import { CreateUserController } from './controllers/CreateUserController'
import { SignInUserController } from './controllers/SignInUserController'
import { SignInUserUsecase } from './core/user/usecases/SignInUserUsecase'
import { JwtTokenAdapter } from './adapters/JwtTokenAdapter'
import { CreateOrUpdateTransactionUsecase } from './core/transaction/usecases/CreateTransactionUsecase'
import { CreateTransactionController } from './controllers/CreateTransactionController'
import { AuthMiddleware } from './middlewares/AuthMiddleware'
import { TransactionKnexRepository } from './adapters/TransactionKnexRepository'

const server = express()

server.use(express.json())
server.use(express.urlencoded({ extended: true }))

const userRepository = new UserMemoryRepository()

const tokenProvider = new JwtTokenAdapter(process.env.JWT_SECRET!)
const reverseProvider = new EncryptPassword()

const createUserUsecase = new CreateUserUsecase(userRepository, reverseProvider)
new CreateUserController(server, createUserUsecase)

const signInUserUsecase = new SignInUserUsecase(userRepository, reverseProvider, tokenProvider)
new SignInUserController(server, signInUserUsecase)

// authenticated routes

const transactionRepository = new TransactionKnexRepository()
const authMiddleware = AuthMiddleware(userRepository, tokenProvider)
const createTransactionUsecase = new CreateOrUpdateTransactionUsecase(transactionRepository)
new CreateTransactionController(server, createTransactionUsecase, authMiddleware)

server.listen(3001, () => console.log('Server is running on http://localhost:3001'))
