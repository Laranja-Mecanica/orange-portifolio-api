import { PortifoliosRepository } from '@/repositories/portifolios-repository'

interface DeletePortifolioUseCaseRequest {
  id: string
}

interface DeletePortifolioUseCaseReponse {}

export class DeletePortifolioUseCase {
  constructor(private portifoliosRepository: PortifoliosRepository) {}

  async execute({
    id,
  }: DeletePortifolioUseCaseRequest): Promise<DeletePortifolioUseCaseReponse> {
    const hasPortifolio = await this.portifoliosRepository.findById(id)

    if (!hasPortifolio) {
      throw new Error('Resource not found.')
    }

    await this.portifoliosRepository.delete(id)

    return {}
  }
}
