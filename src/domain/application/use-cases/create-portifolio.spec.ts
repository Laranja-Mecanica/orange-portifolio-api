import { InMemoryPortifoliosRepository } from 'test/respositories/in-memory-portifolios-repository'
import { CreatePortifolioUseCase } from './create-portifolio'

let inMemoryPortifoliosRepository: InMemoryPortifoliosRepository
let sut: CreatePortifolioUseCase

describe('Create Portifolio Use Case', () => {
  beforeEach(() => {
    inMemoryPortifoliosRepository = new InMemoryPortifoliosRepository()
    sut = new CreatePortifolioUseCase(inMemoryPortifoliosRepository)
  })

  it('should be able an user create a portifolio', async () => {
    const result = await sut.execute({
      title: 'New Project',
      description: 'Nice description here...',
      tag: 'Back-end',
      link: 'random-link',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryPortifoliosRepository.items).toHaveLength(1)
  })
})
