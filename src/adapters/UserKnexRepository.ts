import connection from '../database/connection';

import { IUserRepository } from "../core/ports/UserRepository.interface";
import { User } from '../core/user/entity/user';

export class UserKnexRepository implements IUserRepository {

    async findByEmail(value: string): Promise<User | null> {
        return await connection('user').where('email', value).first()
    }

    async create({ id, name, email, password }: User): Promise<void> {
        await connection('user').insert({
            id,
            name,
            email,
            password
        })
    }
}