import { Either, left, right } from '@/core/either'
import { UsersRepository } from '@/domain/application/repositories/users-repository'
import { Encrypter } from '../cryptography/encrypter'
import { Hasher } from '../cryptography/hasher'
import { WrongCredentialsError } from './errors/wrong-credentials-error'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

type AuthenticateUseCaseResponse = Either<
  WrongCredentialsError,
  {
    accessToken: string
  }
>

export class AuthenticateUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hasher: Hasher,
    private encrypter: Encrypter,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      return left(new WrongCredentialsError())
    }

    const isPasswordMatch = await this.hasher.compare(password, user.password)

    if (!isPasswordMatch) {
      return left(new WrongCredentialsError())
    }

    const accessToken = await this.encrypter.encrypt({
      sub: user.id.toString(),
    })

    return right({ accessToken })
  }
}
