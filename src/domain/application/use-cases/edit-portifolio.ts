import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { PortifoliosRepository } from '@/domain/application/repositories/portifolios-repository'

interface EditPortifolioUseCaseRequest {
  portifolioId: string
  title: string
  description: string
  link: string
  userId: string
  thumbKey: string
  tags: string[]
}

type EditPortifolioUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  null
>

export class EditPortifolioUseCase {
  constructor(private portifoliosRepository: PortifoliosRepository) {}

  async execute({
    portifolioId,
    title,
    description,
    link,
    tags,
    thumbKey,
    userId,
  }: EditPortifolioUseCaseRequest): Promise<EditPortifolioUseCaseResponse> {
    const portifolio = await this.portifoliosRepository.findById(portifolioId)

    if (!portifolio) {
      return left(new ResourceNotFoundError())
    }

    if (userId !== portifolio.userId.toString()) {
      return left(new NotAllowedError())
    }

    portifolio.title = title
    portifolio.description = description
    portifolio.link = link
    portifolio.tags = tags
    portifolio.thumbKey = thumbKey

    await this.portifoliosRepository.save(portifolio)

    return right(null)
  }
}
