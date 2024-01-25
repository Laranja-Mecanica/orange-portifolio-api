import { UsersRepository } from '@/domain/application/repositories/users-repository'
import { User } from '@/domain/entities/user'
import { getPrisma } from '../prisma'
import { PrismaUserMapper } from './mappers/prisma-user-mapper'

const prisma = getPrisma()

export class PrismaUsersRespository implements UsersRepository {
  findById(id: string): Promise<User | null> {
    throw new Error('Method not implemented.')
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      return null
    }

    return PrismaUserMapper.toDomain(user)
  }

  async create(user: User) {
    const data = PrismaUserMapper.toPrisma(user)

    await prisma.user.create({
      data,
    })

    return user
  }
}
