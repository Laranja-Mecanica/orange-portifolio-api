import { Either, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { PortifoliosRepository } from '@/domain/application/repositories/portifolios-repository'
import { Portifolio } from '@/domain/entities/portifolio'

interface CreatePortifolioUseCaseRequest {
  userId: string
  title: string
  link: string
  description: string
  thumbKey: string
  tags: string[]
}

type CreatePortifolioUseCaseReponse = Either<
  null,
  {
    portifolio: Portifolio
  }
>

export class CreatePortifolioUseCase {
  constructor(private portifoliosRepository: PortifoliosRepository) {}

  async execute({
    userId,
    title,
    link,
    description,
    tags,
    thumbKey,
  }: CreatePortifolioUseCaseRequest): Promise<CreatePortifolioUseCaseReponse> {
    const portifolio = Portifolio.create({
      userId: new UniqueEntityID(userId),
      title,
      description,
      link,
      thumbKey,
      tags,
    })

    await this.portifoliosRepository.create(portifolio)

    return right({
      portifolio,
    })
  }
}
