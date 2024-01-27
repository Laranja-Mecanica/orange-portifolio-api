import { PrismaPortifoliosRepository } from '@/http/prisma/repositories/prisma-portifolios-repository'
import { GetPortifolioByIdUseCase } from '../get-portifolio-by-id'

export function makeGetPortifolioByIdUseCase() {
  const portifoliosRepository = new PrismaPortifoliosRepository()
  const useCase = new GetPortifolioByIdUseCase(portifoliosRepository)

  return useCase
}
