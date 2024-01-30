import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makePortifolio } from 'test/factories/make-portifolio'
import { InMemoryPortifoliosRepository } from 'test/respositories/in-memory-portifolios-repository'
import { FetchUserPortifolioUseCase } from './fetch-user-portifolios'

let inMemoryPortifoliosRepository: InMemoryPortifoliosRepository
let sut: FetchUserPortifolioUseCase

describe('Fetch User Portifolio Use Case', () => {
  beforeEach(() => {
    inMemoryPortifoliosRepository = new InMemoryPortifoliosRepository()
    sut = new FetchUserPortifolioUseCase(inMemoryPortifoliosRepository)
  })

  it('should be able to fetch a user portifolios', async () => {
    const portifolio1 = makePortifolio({ userId: new UniqueEntityID('777') })
    const portifolio2 = makePortifolio({ userId: new UniqueEntityID('777') })

    inMemoryPortifoliosRepository.items.push(portifolio1)
    inMemoryPortifoliosRepository.items.push(portifolio2)
    inMemoryPortifoliosRepository.items.push(makePortifolio())

    const result = await sut.execute({ id: '777', page: 1 })

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
      id: 'user-01',
      page: 2,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.portifolios).toHaveLength(2)
  })
})
