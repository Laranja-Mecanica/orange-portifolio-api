import { PrismaPortifoliosRepository } from '@/http/prisma/repositories/prisma-portifolios-repository'
import { FetchUserPortifolioUseCase } from '../fetch-user-portifolios'

export function makeFetchPortifolioUseCase() {
  const portifoliosRepository = new PrismaPortifoliosRepository()
  const useCase = new FetchUserPortifolioUseCase(portifoliosRepository)

  return useCase
}
