import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { PortfolioWithUser } from '@/domain/entities/value-objects/portfolio-with-user'
import {
  Portifolio as PrismaPortfolio,
  User as PrismaUser,
} from '@prisma/client'

type PrismaPortfolioWithUser = PrismaPortfolio & {
  user: PrismaUser
}

export class PrismaPortfolioWithUserMapper {
  static toDomain(raw: PrismaPortfolioWithUser): PortfolioWithUser {
    return PortfolioWithUser.create({
      userId: new UniqueEntityID(raw.userId),
      userName: raw.user.name,
      userLastName: raw.user.lastName,
      title: raw.title,
      description: raw.description,
      link: raw.link,
      tags: raw.tags,
      thumbKey: raw.thumbKey,
      createdAt: raw.createdAt,
    })
  }
}
