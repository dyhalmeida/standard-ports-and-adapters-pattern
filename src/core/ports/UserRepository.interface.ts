import { User } from "../user/entity/user"

interface ICreateUser {
    create(user: User): Promise<void>
    findByEmail(value: string): Promise<User | null>
}

export interface IUserRepository extends ICreateUser {}