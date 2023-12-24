import { NextFunction, Request, Response } from "express";
import { ITokenProvider } from "../core/ports/TokenProvider.interface";
import { IUserRepository } from "../core/ports/UserRepository.interface";

export function AuthMiddleware(
    userRepository: IUserRepository,
    tokenProvider: ITokenProvider
) {
    return async (req: Request, res: Response, next: NextFunction) => {

        const accessDenied = () => res.status(403).json({ message: 'access denied' })

       try {
            const token = req.headers.authorization?.replace('Bearer', '')
            if (!token) {
                accessDenied()
                return
            }

            const validToken = tokenProvider.validate(token) as { email: string }
            const user = await userRepository.findByEmail(validToken.email)

            if (!user?.id) {
                accessDenied()
                return
            }
            (req as any).user = user
            next()
       } catch (error) {
            accessDenied()
       }
    }
}