import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { User } from '@/domain/entities/user'
import { Prisma, user as PrismaUser } from '@prisma/client'

export class PrismaUserMapper {
  static toDomain(raw: PrismaUser): User {
    return User.create(
      {
        name: raw.name,
        lastName: raw.lastName,
        email: raw.email,
        password: raw.password,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(user: User): Prisma.userUncheckedCreateInput {
    return {
      id: user.id.toString(),
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
    }
  }
}
