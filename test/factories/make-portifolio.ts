import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Portifolio, PortifolioProps } from '@/domain/entities/portifolio'
import { getPrisma } from '@/http/prisma/prisma'
import { PrismaPortifolioMapper } from '@/http/prisma/repositories/mappers/prisma-portifolio-mapper'
import { faker } from '@faker-js/faker'

export function makePortifolio(
  override: Partial<PortifolioProps> = {},
  id?: UniqueEntityID,
) {
  const portifolio = Portifolio.create(
    {
      userId: new UniqueEntityID(),
      title: faker.lorem.sentence(3),
      description: faker.lorem.sentence(8),
      link: faker.internet.url(),
      tags: [faker.word.sample(5), faker.word.sample(5)],
      ...override,
    },
    id,
  )

  return portifolio
}

export async function makePrismaPortifolio(data: Partial<Portifolio> = {}) {
  const portifolio = makePortifolio(data)

  const prisma = getPrisma()

  await prisma.portifolio.create({
    data: PrismaPortifolioMapper.toPrisma(portifolio),
  })

  return portifolio
}
