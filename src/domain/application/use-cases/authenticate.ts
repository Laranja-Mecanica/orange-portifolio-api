import { Either, left, right } from '@/core/either'
import { UsersRepository } from '@/domain/application/repositories/users-repository'
import { User } from '@/domain/entities/user'
import { compare } from 'bcrypt'
import { WrongCredentialsError } from './errors/wrong-credentials-error'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

type AuthenticateUseCaseResponse = Either<
  WrongCredentialsError,
  {
    user: User
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

    return right({ user })
  }
}
