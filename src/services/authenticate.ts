import { UsersRepository } from '@/repositories/users-repository'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { compare } from 'bcryptjs'
import { User } from '@prisma/client'

interface AuthenticateParams {
  email: string
  password: string
}

interface AuthenticateResponse {
  hasUser: User
}

export class AuthenticateService {
  constructor(private userRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateParams): Promise<AuthenticateResponse> {
    const hasUser = await this.userRepository.findByEmail(email)

    if (!hasUser) {
      throw new InvalidCredentialsError()
    }

    const thePasswordsMatch = await compare(password, hasUser.password_hash)

    if (!thePasswordsMatch) {
      throw new InvalidCredentialsError()
    }

    return {
      hasUser,
    }
  }
}
