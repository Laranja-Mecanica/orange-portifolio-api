import { randomUUID } from 'node:crypto'
import { InMemoryPortifoliosRepository } from 'test/respositories/in-memory-portifolios-repository'
import { EditPortifolioUseCase } from './edit-portifolio'

let inMemoryPortifoliosRepository: InMemoryPortifoliosRepository
let sut: EditPortifolioUseCase

describe('Edit Portifolio Use Case', () => {
  beforeEach(() => {
    inMemoryPortifoliosRepository = new InMemoryPortifoliosRepository()
    sut = new EditPortifolioUseCase(inMemoryPortifoliosRepository)
  })

  it('should be able to edit a portifolio', async () => {
    const newPortifolio = await inMemoryPortifoliosRepository.create({
      id: randomUUID(),
      title: 'New Project',
      description: 'Nice description here...',
      tag: 'Back-end',
      link: 'random-link',
    })

    await sut.execute({
      portifolioId: newPortifolio.id,
      title: 'Updated title',
      description: 'Updated description',
      tag: 'Node.js',
      link: 'random-link',
    })

    expect(inMemoryPortifoliosRepository.items[0].title).toBe('Updated title')
    expect(inMemoryPortifoliosRepository.items[0].description).toBe(
      'Updated description',
    )
  })
})
