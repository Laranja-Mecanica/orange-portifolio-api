import { User, UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcrypt'
import { randomUUID } from 'node:crypto'

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

    const user = await this.usersRepository.create({
      id: randomUUID(),
      name,
      lastName,
      email,
      password: password_hash,
    })

    return {
      user,
    }
  }
}
