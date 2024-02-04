import { Either, right } from '@/core/either'
import { PortfolioWithUser } from '@/domain/entities/value-objects/portfolio-with-user'
import { PortifoliosRepository } from '../repositories/portifolios-repository'

interface FetchUserPortifolioUseCaseRequest {
  id: string
  page: number
}

type FetchUserPortifolioUseCaseResponse = Either<
  null,
  {
    portifolios: PortfolioWithUser[]
  }
>

export class FetchUserPortifolioUseCase {
  constructor(private portifolioRepository: PortifoliosRepository) {}

  async execute({
    id,
    page,
  }: FetchUserPortifolioUseCaseRequest): Promise<FetchUserPortifolioUseCaseResponse> {
    const portifolios =
      await this.portifolioRepository.findManyByUserIdWithUser(id, page)

    return right({ portifolios })
  }
}
