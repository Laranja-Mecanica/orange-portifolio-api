import {
  Portifolio,
  PortifoliosRepository,
} from '@/repositories/portifolios-repository'
import { randomUUID } from 'node:crypto'

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
    const portifolio = await this.portifoliosRepository.create({
      id: randomUUID(),
      title,
      tag,
      link,
      description,
    })

    return {
      portifolio,
    }
  }
}
