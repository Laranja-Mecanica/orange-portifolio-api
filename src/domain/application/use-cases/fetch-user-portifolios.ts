import { Either, right } from '@/core/either'
import { Portifolio } from '@/domain/entities/portifolio'
import { PortifoliosRepository } from '../repositories/portifolios-repository'

interface FetchUserPortifolioUseCaseRequest {
  id: string
  page: number
}

type FetchUserPortifolioUseCaseResponse = Either<
  null,
  {
    portifolios: Portifolio[]
  }
>

export class FetchUserPortifolioUseCase {
  constructor(private portifolioRepository: PortifoliosRepository) {}

  async execute({
    id,
    page,
  }: FetchUserPortifolioUseCaseRequest): Promise<FetchUserPortifolioUseCaseResponse> {
    const portifolios = await this.portifolioRepository.findManyByUserId(
      id,
      page,
    )

    return right({ portifolios })
  }
}
