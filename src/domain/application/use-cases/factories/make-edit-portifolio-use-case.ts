import { PrismaPortifoliosRepository } from '@/http/prisma/repositories/prisma-portifolios-repository'
import { EditPortifolioUseCase } from '../edit-portifolio'

export const makeEditPortifolioUseCase = () => {
  const portifoliosRepository = new PrismaPortifoliosRepository()
  const useCase = new EditPortifolioUseCase(portifoliosRepository)

  return useCase
}
