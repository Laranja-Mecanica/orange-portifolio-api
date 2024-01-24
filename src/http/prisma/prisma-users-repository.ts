import { UsersRepository } from '@/domain/application/repositories/users-repository'
import { User } from '@/domain/entities/user'

export class PrismaUsersRespository implements UsersRepository {
  findById(id: string): Promise<User | null> {
    throw new Error('Method not implemented.')
  }

  findByEmail(email: string): Promise<User | null> {
    throw new Error('Method not implemented.')
  }

  create(user: User): Promise<User> {
    throw new Error('Method not implemented.')
  }
}
