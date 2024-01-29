import { Either, left, right } from '@/core/either'
import { UsersRepository } from '@/domain/application/repositories/users-repository'
import { User } from '@/domain/entities/user'
import { Hasher } from '../cryptography/hasher'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

interface RegisterUseCaseRequest {
  name: string
  lastName: string
  email: string
  password: string
  country: string
}

type RegisterUseCaseResponse = Either<
  UserAlreadyExistsError,
  {
    user: User
  }
>

export class RegisterUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hasher: Hasher,
  ) {}

  async execute({
    name,
    email,
    lastName,
    password,
    country,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const isEmailAlreadyExists = await this.usersRepository.findByEmail(email)

    if (isEmailAlreadyExists) {
      return left(new UserAlreadyExistsError())
    }

    const password_hash = await this.hasher.hash(password)

    const user = User.create({
      name,
      lastName,
      email,
      country,
      password: password_hash,
    })

    await this.usersRepository.create(user)

    return right({
      user,
    })
  }
}
