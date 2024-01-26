import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { PortifoliosRepository } from '@/domain/application/repositories/portifolios-repository'

interface EditPortifolioUseCaseRequest {
  portifolioId: string
  title: string
  description: string
  link: string
}

type EditPortifolioUseCaseResponse = Either<ResourceNotFoundError, null>

export class EditPortifolioUseCase {
  constructor(private portifoliosRepository: PortifoliosRepository) {}

  async execute({
    portifolioId,
    title,
    description,
    link,
  }: EditPortifolioUseCaseRequest): Promise<EditPortifolioUseCaseResponse> {
    const portifolio = await this.portifoliosRepository.findById(portifolioId)

    if (!portifolio) {
      return left(new ResourceNotFoundError())
    }

    portifolio.title = title
    portifolio.description = description
    portifolio.link = link

    await this.portifoliosRepository.save(portifolio)

    return right(null)
  }
}
