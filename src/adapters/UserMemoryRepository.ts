import { IUserRepository } from "../core/ports/UserRepository.interface";
import { User } from "../core/user/entity/user";

export class UserMemoryRepository implements IUserRepository {
    private static items: User[] = []

    findByEmail(value: string): Promise<User | null> {
        const user = UserMemoryRepository.items.find(item => item.email === value)
        return Promise.resolve(user || null)
    }

    async create(user: User) {
        UserMemoryRepository.items.push(user)
    }
}