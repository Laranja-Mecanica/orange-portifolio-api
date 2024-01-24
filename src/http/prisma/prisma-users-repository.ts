import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { UsersRepository } from '@/domain/application/repositories/users-repository'
import { User } from '@/domain/entities/user'
import { getPrisma } from '../lib/prisma/prisma'

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

    const mapperUser = User.create(
      {
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
      },
      new UniqueEntityID(user.id),
    )

    return mapperUser
  }

  async create(user: User) {
    const data = {
      id: user.id.toString(),
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
    }

    await prisma.user.create({
      data,
    })

    return user
  }
}
