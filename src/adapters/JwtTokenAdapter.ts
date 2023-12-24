import { ITokenProvider } from '../core/ports/TokenProvider.interface'
import jwt from 'jsonwebtoken'

export class JwtTokenAdapter implements ITokenProvider {

    constructor(private secret: string) {}

    generate(payload: string | object): string {
        return jwt.sign(payload, this.secret, { expiresIn: '1d' })
    }
    
    validate(token: string): string | object {
        return jwt.verify(token, this.secret)
    }
}