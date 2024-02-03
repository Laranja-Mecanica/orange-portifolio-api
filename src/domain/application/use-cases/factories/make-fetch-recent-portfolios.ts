import { PrismaPortifoliosRepository } from '@/http/prisma/repositories/prisma-portifolios-repository'
import { FetchRecentPortifolioUseCase } from '../fetch-recent-portfolios'

export function makeFetchRecentPortifolioUseCase() {
  const portifoliosRepository = new PrismaPortifoliosRepository()
  const useCase = new FetchRecentPortifolioUseCase(portifoliosRepository)

  return useCase
}
