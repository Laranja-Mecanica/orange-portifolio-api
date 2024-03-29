import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { makePortifolio } from 'test/factories/make-portifolio'
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
    const newPortifolio = makePortifolio()
    const newPortifolio2 = makePortifolio()

    await inMemoryPortifoliosRepository.create(newPortifolio)
    await inMemoryPortifoliosRepository.create(newPortifolio2)

    const portifolioId = newPortifolio.id.toString()
    const portifolioOwnerId = newPortifolio.userId.toString()

    await sut.execute({
      id: portifolioId,
      userId: portifolioOwnerId,
    })

    expect(inMemoryPortifoliosRepository.items).toHaveLength(1)
  })

  it('should not be able to delete non existing portifolio', async () => {
    await inMemoryPortifoliosRepository.create(makePortifolio())
    await inMemoryPortifoliosRepository.create(makePortifolio())

    const result = await sut.execute({
      id: 'wrongId',
      userId: '',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
    expect(inMemoryPortifoliosRepository.items).toHaveLength(2)
  })

  it('should not be able to delete a portifolio from another user', async () => {
    const newPortifolio = makePortifolio()

    await inMemoryPortifoliosRepository.create(newPortifolio)
    await inMemoryPortifoliosRepository.create(makePortifolio())

    const portifolioId = newPortifolio.id.toString()

    const result = await sut.execute({
      id: portifolioId,
      userId: 'random-user',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
    expect(inMemoryPortifoliosRepository.items).toHaveLength(2)
  })
})
