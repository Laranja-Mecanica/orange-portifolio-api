import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makePortifolio } from 'test/factories/make-portifolio'
import { InMemoryPortifoliosRepository } from 'test/respositories/in-memory-portifolios-repository'
import { FetchRecentPortifolioUseCase } from './fetch-recent-portfolios'

let inMemoryPortifoliosRepository: InMemoryPortifoliosRepository
let sut: FetchRecentPortifolioUseCase

describe('Fetch Recent Portifolios Use Case', () => {
  beforeEach(() => {
    inMemoryPortifoliosRepository = new InMemoryPortifoliosRepository()
    sut = new FetchRecentPortifolioUseCase(inMemoryPortifoliosRepository)
  })

  it('should be able to fetch recent portifolios', async () => {
    const portifolio1 = makePortifolio()
    const portifolio2 = makePortifolio()

    inMemoryPortifoliosRepository.items.push(portifolio1)
    inMemoryPortifoliosRepository.items.push(portifolio2)

    const result = await sut.execute({ page: 1 })

    expect(result.value?.portifolios).toHaveLength(2)
    expect(result.value?.portifolios).toEqual(
      expect.arrayContaining([portifolio1, portifolio2]),
    )
  })

  it('should fetch 20 itens per page', async () => {
    for (let i = 0; i < 22; i++) {
      inMemoryPortifoliosRepository.items.push(
        makePortifolio({ userId: new UniqueEntityID('user-01') }),
      )
    }

    const result = await sut.execute({
      page: 2,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.portifolios).toHaveLength(2)
  })
})
