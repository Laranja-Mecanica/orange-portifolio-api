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
      userId: 'user-01',
      title: 'New Project',
      description: 'Nice description here...',
      link: 'random-link',
      tags: ['tag-01', 'tag-02'],
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryPortifoliosRepository.items).toHaveLength(1)
    expect(inMemoryPortifoliosRepository.items[0].tags).toHaveLength(2)
  })
})
