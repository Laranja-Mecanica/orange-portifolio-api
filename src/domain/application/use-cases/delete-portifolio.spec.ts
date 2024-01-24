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

    await sut.execute({
      id: portifolioId,
    })

    expect(inMemoryPortifoliosRepository.items).toHaveLength(1)
  })

  it('should not be able to delete non existing portifolio', async () => {
    await inMemoryPortifoliosRepository.create(makePortifolio())
    await inMemoryPortifoliosRepository.create(makePortifolio())

    await expect(() =>
      sut.execute({
        id: 'wrongId',
      }),
    ).rejects.toBeInstanceOf(Error)
    expect(inMemoryPortifoliosRepository.items).toHaveLength(2)
  })
})
