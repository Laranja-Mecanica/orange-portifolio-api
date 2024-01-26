import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { PortifoliosRepository } from '@/domain/application/repositories/portifolios-repository'
import { Portifolio } from '@/domain/entities/portifolio'

interface GetPortifolioByIdUseCaseRequest {
  id: string
}

type GetPortifolioByIdUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    portifolio: Portifolio
  }
>

export class GetPortifolioByIdUseCase {
  constructor(private portifoliosRepository: PortifoliosRepository) {}

  async execute({
    id,
  }: GetPortifolioByIdUseCaseRequest): Promise<GetPortifolioByIdUseCaseResponse> {
    const portifolio = await this.portifoliosRepository.findById(id)

    if (!portifolio) {
      return left(new ResourceNotFoundError())
    }

    return right({
      portifolio,
    })
  }
}
