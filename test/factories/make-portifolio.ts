import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Portifolio, PortifolioProps } from '@/domain/entities/portifolio'
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
      tag: faker.lorem.word(),
      ...override,
    },
    id,
  )

  return portifolio
}
