import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { PortifoliosRepository } from '@/domain/application/repositories/portifolios-repository'

interface DeletePortifolioUseCaseRequest {
  id: string
  userId: string
}

type DeletePortifolioUseCaseReponse = Either<
  ResourceNotFoundError | NotAllowedError,
  null
>

export class DeletePortifolioUseCase {
  constructor(private portifoliosRepository: PortifoliosRepository) {}

  async execute({
    id,
    userId,
  }: DeletePortifolioUseCaseRequest): Promise<DeletePortifolioUseCaseReponse> {
    const portifolio = await this.portifoliosRepository.findById(id)

    if (!portifolio) {
      return left(new ResourceNotFoundError())
    }

    if (userId !== portifolio.userId.toString()) {
      return left(new NotAllowedError())
    }

    await this.portifoliosRepository.delete(id)

    return right(null)
  }
}
