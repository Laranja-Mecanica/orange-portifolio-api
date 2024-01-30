import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { makePortifolio } from 'test/factories/make-portifolio'
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
    const portifolio = makePortifolio()

    await inMemoryPortifoliosRepository.create(portifolio)

    const portifolioId = portifolio.id.toString()
    const portifolioOwnerId = portifolio.userId.toString()

    const result = await sut.execute({
      portifolioId,
      title: 'Updated title',
      description: 'Updated description',
      link: 'random-link',
      tags: ['tag-1', 'tag-2'],
      userId: portifolioOwnerId,
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryPortifoliosRepository.items[0].title).toBe('Updated title')
    expect(inMemoryPortifoliosRepository.items[0].description).toBe(
      'Updated description',
    )
    expect(inMemoryPortifoliosRepository.items[0].tags).toStrictEqual([
      'tag-1',
      'tag-2',
    ])
  })

  it('should not be able to edit a portifolio from another user', async () => {
    const portifolio = makePortifolio()

    await inMemoryPortifoliosRepository.create(portifolio)

    const portifolioId = portifolio.id.toString()

    const result = await sut.execute({
      portifolioId,
      title: 'Updated title',
      description: 'Updated description',
      link: 'random-link',
      userId: 'random-user',
      tags: ['tag-01', 'tag-2'],
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
