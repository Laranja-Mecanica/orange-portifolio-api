import { PortifoliosRepository } from '@/domain/application/repositories/portifolios-repository'
import { Portifolio } from '@/domain/entities/portifolio'

interface CreatePortifolioUseCaseRequest {
  title: string
  tag: string
  link: string
  description: string
}

interface CreatePortifolioUseCaseReponse {
  portifolio: Portifolio
}

export class CreatePortifolioUseCase {
  constructor(private portifoliosRepository: PortifoliosRepository) {}

  async execute({
    title,
    tag,
    link,
    description,
  }: CreatePortifolioUseCaseRequest): Promise<CreatePortifolioUseCaseReponse> {
    const portifolio = Portifolio.create({
      title,
      description,
      link,
      tag,
    })

    await this.portifoliosRepository.create(portifolio)

    return {
      portifolio,
    }
  }
}
