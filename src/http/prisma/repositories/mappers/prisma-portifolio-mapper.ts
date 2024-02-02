import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Portifolio } from '@/domain/entities/portifolio'
import { Prisma, Portifolio as PrismaPortifolio } from '@prisma/client'

export class PrismaPortifolioMapper {
  static toDomain(raw: PrismaPortifolio): Portifolio {
    return Portifolio.create(
      {
        userId: new UniqueEntityID(raw.userId),
        title: raw.title,
        description: raw.description,
        link: raw.link,
        tags: raw.tags,
        thumbKey: raw.thumbKey,
        createdAt: raw.createdAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(
    portifolio: Portifolio,
  ): Prisma.PortifolioUncheckedCreateInput {
    return {
      id: portifolio.id.toString(),
      title: portifolio.title,
      description: portifolio.description,
      link: portifolio.link,
      tags: portifolio.tags,
      thumbKey: portifolio.thumbKey,
      userId: portifolio.userId.toString(),
      createdAt: portifolio.createdAt,
    }
  }
}
