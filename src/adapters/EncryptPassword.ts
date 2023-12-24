import bcrypt from 'bcrypt'
import { IReverseProvider } from "../core/ports/ReverseProvider.interface";

export class EncryptPassword implements IReverseProvider {
    reverse(value: string): string {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(value, salt)
    }
    compare(value: string, valueToCompare: string): boolean {
        return bcrypt.compareSync(value, valueToCompare)
    }
}