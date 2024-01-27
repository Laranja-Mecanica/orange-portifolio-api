import { PrismaPortifoliosRepository } from '@/http/prisma/repositories/prisma-portifolios-repository'
import { DeletePortifolioUseCase } from '../delete-portifolio'

export const makeDeletePortifolioUseCase = () => {
  const portifoliosRepository = new PrismaPortifoliosRepository()
  const useCase = new DeletePortifolioUseCase(portifoliosRepository)

  return useCase
}
