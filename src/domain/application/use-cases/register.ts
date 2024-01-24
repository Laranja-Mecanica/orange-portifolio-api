import { UsersRepository } from '@/domain/application/repositories/users-repository'
import { User } from '@/domain/entities/user'
import { hash } from 'bcrypt'

interface RegisterUseCaseRequest {
  name: string
  lastName: string
  email: string
  password: string
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    lastName,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const isEmailAlreadyExists = await this.usersRepository.findByEmail(email)

    if (isEmailAlreadyExists) {
      throw new Error('User already exists.')
    }

    const password_hash = await hash(password, 10)

    const user = User.create({
      name,
      lastName,
      email,
      password: password_hash,
    })

    await this.usersRepository.create(user)

    return {
      user,
    }
  }
}
