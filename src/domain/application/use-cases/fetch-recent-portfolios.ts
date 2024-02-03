import { Either, right } from '@/core/either'
import { Portifolio } from '@/domain/entities/portifolio'
import { PortifoliosRepository } from '../repositories/portifolios-repository'

interface FetchRecentPortifoslioUseCaseRequest {
  page: number
}

type FetchRecentPortifoliosUseCaseResponse = Either<
  null,
  {
    portifolios: Portifolio[]
  }
>

export class FetchRecentPortifolioUseCase {
  constructor(private portifolioRepository: PortifoliosRepository) {}

  async execute({
    page,
  }: FetchRecentPortifoslioUseCaseRequest): Promise<FetchRecentPortifoliosUseCaseResponse> {
    const portifolios = await this.portifolioRepository.findManyRecent(page)

    return right({ portifolios })
  }
}
