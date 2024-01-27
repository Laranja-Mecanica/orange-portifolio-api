import { PrismaPortifoliosRepository } from '@/http/prisma/repositories/prisma-portifolios-repository'
import { CreatePortifolioUseCase } from '../create-portifolio'

export const makeCreatePortifolioUseCase = () => {
  const portifoliosRepository = new PrismaPortifoliosRepository()
  const useCase = new CreatePortifolioUseCase(portifoliosRepository)

  return useCase
}
