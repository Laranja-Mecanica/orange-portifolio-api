import { PortifoliosRepository } from '@/domain/application/repositories/portifolios-repository'
import { Portifolio } from '@/domain/entities/portifolio'
import { getPrisma } from '../prisma'
import { PrismaPortifolioMapper } from './mappers/prisma-portifolio-mapper'

const prisma = getPrisma()

export class PrismaPortifoliosRepository implements PortifoliosRepository {
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
