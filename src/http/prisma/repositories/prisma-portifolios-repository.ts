import { PortifoliosRepository } from '@/domain/application/repositories/portifolios-repository'
import { Portifolio } from '@/domain/entities/portifolio'
import { getPrisma } from '../prisma'
import { PrismaPortfolioWithUserMapper } from './mappers/prisma-portfolio-with-user-mapper'
import { PrismaPortifolioMapper } from './mappers/prisma-portifolio-mapper'

const prisma = getPrisma()

export class PrismaPortifoliosRepository implements PortifoliosRepository {
  async findByIdWithUser(id: string) {
    const portifolio = await prisma.portifolio.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
      },
    })

    if (!portifolio) {
      return null
    }

    return PrismaPortfolioWithUserMapper.toDomain(portifolio)
  }

  async findManyByUserIdWithUser(userId: string, page: number) {
    const portifolios = await prisma.portifolio.findMany({
      where: {
        userId,
      },
      take: 20,
      skip: (page - 1) * page,
      include: {
        user: true,
      },
    })

    return portifolios.map(PrismaPortfolioWithUserMapper.toDomain)
  }

  async findManyRecentWithUser(page: number) {
    const portifolios = await prisma.portifolio.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * page,
      include: {
        user: true,
      },
    })

    return portifolios.map(PrismaPortfolioWithUserMapper.toDomain)
  }

  async findManyByUserId(userId: string, page: number) {
    const portifolios = await prisma.portifolio.findMany({
      where: {
        userId,
      },
      take: 20,
      skip: (page - 1) * page,
    })

    return portifolios.map(PrismaPortifolioMapper.toDomain)
  }

  async findManyRecent(page: number) {
    const portifolios = await prisma.portifolio.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * page,
    })

    return portifolios.map(PrismaPortifolioMapper.toDomain)
  }

  async findById(id: string) {
    const portifolio = await prisma.portifolio.findUnique({
      where: {
        id,
      },
    })

    if (!portifolio) {
      return null
    }

    return PrismaPortifolioMapper.toDomain(portifolio)
  }

  async create(portifolio: Portifolio) {
    const data = PrismaPortifolioMapper.toPrisma(portifolio)

    await prisma.portifolio.create({
      data,
    })
  }

  async save(portifolio: Portifolio) {
    const data = PrismaPortifolioMapper.toPrisma(portifolio)

    await prisma.portifolio.update({
      where: {
        id: data.id,
      },
      data,
    })
  }

  async delete(id: string) {
    await prisma.portifolio.delete({
      where: {
        id,
      },
    })
  }
}
