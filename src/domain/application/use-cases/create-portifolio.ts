import { Either, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { PortifoliosRepository } from '@/domain/application/repositories/portifolios-repository'
import { Portifolio } from '@/domain/entities/portifolio'

interface CreatePortifolioUseCaseRequest {
  userId: string
  title: string
  tag: string
  link: string
  description: string
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
    tag,
    link,
    description,
  }: CreatePortifolioUseCaseRequest): Promise<CreatePortifolioUseCaseReponse> {
    const portifolio = Portifolio.create({
      userId: new UniqueEntityID(userId),
      title,
      description,
      link,
      tag,
    })

    await this.portifoliosRepository.create(portifolio)

    return right({
      portifolio,
    })
  }
}
