import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { PortifoliosRepository } from '@/domain/application/repositories/portifolios-repository'

interface DeletePortifolioUseCaseRequest {
  id: string
}

type DeletePortifolioUseCaseReponse = Either<ResourceNotFoundError, null>

export class DeletePortifolioUseCase {
  constructor(private portifoliosRepository: PortifoliosRepository) {}

  async execute({
    id,
  }: DeletePortifolioUseCaseRequest): Promise<DeletePortifolioUseCaseReponse> {
    const hasPortifolio = await this.portifoliosRepository.findById(id)

    if (!hasPortifolio) {
      return left(new ResourceNotFoundError())
    }

    await this.portifoliosRepository.delete(id)

    return right(null)
  }
}
