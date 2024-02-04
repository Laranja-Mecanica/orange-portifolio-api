import { Either, right } from '@/core/either'
import { PortfolioWithUser } from '@/domain/entities/value-objects/portfolio-with-user'
import { PortifoliosRepository } from '../repositories/portifolios-repository'

interface FetchRecentPortifoslioUseCaseRequest {
  page: number
}

type FetchRecentPortifoliosUseCaseResponse = Either<
  null,
  {
    portifolios: PortfolioWithUser[]
  }
>

export class FetchRecentPortifolioUseCase {
  constructor(private portifolioRepository: PortifoliosRepository) {}

  async execute({
    page,
  }: FetchRecentPortifoslioUseCaseRequest): Promise<FetchRecentPortifoliosUseCaseResponse> {
    const portifolios =
      await this.portifolioRepository.findManyRecentWithUser(page)

    return right({ portifolios })
  }
}
