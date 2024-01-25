import { Either, left, right } from '@/core/either'
import { UsersRepository } from '@/domain/application/repositories/users-repository'
import { env } from '@/env'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { WrongCredentialsError } from './errors/wrong-credentials-error'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

type AuthenticateUseCaseResponse = Either<
  WrongCredentialsError,
  {
    token: string
  }
>

export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      return left(new WrongCredentialsError())
    }

    const isPasswordMatch = await compare(password, user.password)

    if (!isPasswordMatch) {
      return left(new WrongCredentialsError())
    }

    const token = await sign({ sub: user.id.toString() }, env.JWT_PVK, {
      expiresIn: '8h',
    })

    return right({ token })
  }
}
