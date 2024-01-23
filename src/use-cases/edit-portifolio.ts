import { PortifoliosRepository } from '@/repositories/portifolios-repository'

interface EditPortifolioUseCaseRequest {
  portifolioId: string
  title: string
  description: string
  link: string
  tag: string
}

interface EditPortifolioUseCaseResponse {}

export class EditPortifolioUseCase {
  constructor(private portifoliosRepository: PortifoliosRepository) {}

  async execute({
    portifolioId,
    title,
    description,
    link,
    tag,
  }: EditPortifolioUseCaseRequest): Promise<EditPortifolioUseCaseResponse> {
    const portifolio = await this.portifoliosRepository.findById(portifolioId)

    if (!portifolio) {
      throw new Error('Resource not found.')
    }

    portifolio.title = title
    portifolio.description = description
    portifolio.link = link
    portifolio.tag = tag

    await this.portifoliosRepository.save(portifolio)

    return {}
  }
}
