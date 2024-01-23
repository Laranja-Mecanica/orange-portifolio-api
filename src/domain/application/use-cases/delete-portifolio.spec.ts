import { randomUUID } from 'node:crypto'
import { InMemoryPortifoliosRepository } from 'test/respositories/in-memory-portifolios-repository'
import { DeletePortifolioUseCase } from './delete-portifolio'

let inMemoryPortifoliosRepository: InMemoryPortifoliosRepository
let sut: DeletePortifolioUseCase

describe('Delete Portifolio Use Case', () => {
  beforeEach(() => {
    inMemoryPortifoliosRepository = new InMemoryPortifoliosRepository()
    sut = new DeletePortifolioUseCase(inMemoryPortifoliosRepository)
  })

  it('should be able to delete a portifolio', async () => {
    const newPortifolio = await inMemoryPortifoliosRepository.create({
      id: randomUUID(),
      title: 'New Project',
      description: 'Nice description here...',
      tag: 'Back-end',
      link: 'random-link',
    })

    await inMemoryPortifoliosRepository.create({
      id: randomUUID(),
      title: 'New Project',
      description: 'Nice description here...',
      tag: 'Back-end',
      link: 'random-link',
    })

    await sut.execute({
      id: newPortifolio.id,
    })

    expect(inMemoryPortifoliosRepository.items).toHaveLength(1)
  })

  it('should not be able to delete non existing portifolio', async () => {
    await inMemoryPortifoliosRepository.create({
      id: randomUUID(),
      title: 'New Project',
      description: 'Nice description here...',
      tag: 'Back-end',
      link: 'random-link',
    })

    await inMemoryPortifoliosRepository.create({
      id: randomUUID(),
      title: 'New Project',
      description: 'Nice description here...',
      tag: 'Back-end',
      link: 'random-link',
    })

    await expect(() =>
      sut.execute({
        id: 'wrongId',
      }),
    ).rejects.toBeInstanceOf(Error)
    expect(inMemoryPortifoliosRepository.items).toHaveLength(2)
  })
})
