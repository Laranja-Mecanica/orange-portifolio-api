import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { User, UserProps } from '@/domain/entities/user'
import { getPrisma } from '@/http/prisma/prisma'
import { PrismaUserMapper } from '@/http/prisma/repositories/mappers/prisma-user-mapper'
import { faker } from '@faker-js/faker'

export function makeUser(
  override: Partial<UserProps> = {},
  id?: UniqueEntityID,
) {
  const user = User.create(
    {
      name: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      country: faker.location.country(),
      ...override,
    },
    id,
  )

  return user
}

export async function makePrismaUser(data: Partial<User> = {}) {
  const user = makeUser(data)

  const prisma = getPrisma()

  await prisma.user.create({
    data: PrismaUserMapper.toPrisma(user),
  })

  return user
}
