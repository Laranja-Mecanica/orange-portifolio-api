import { Either, right } from '@/core/either'
import { Portifolio } from '@/domain/entities/portifolio'
import { PortifoliosRepository } from '../repositories/portifolios-repository'

interface FetchUserProfileUseCaseRequest {
  id: string
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
  }: FetchUserProfileUseCaseRequest): Promise<FetchUserPortifolioUseCaseResponse> {
    const portifolios = await this.portifolioRepository.findManyByUserId(id)

    return right({ portifolios })
  }
}
