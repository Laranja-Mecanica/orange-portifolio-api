import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makePortifolio } from 'test/factories/make-portifolio'
import { makeUser } from 'test/factories/make-user'
import { InMemoryPortifoliosRepository } from 'test/respositories/in-memory-portifolios-repository'
import { InMemoryUsersRepository } from 'test/respositories/in-memory-users-repository'
import { FetchRecentPortifolioUseCase } from './fetch-recent-portfolios'

let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryPortifoliosRepository: InMemoryPortifoliosRepository
let sut: FetchRecentPortifolioUseCase

describe('Fetch Recent Portifolios Use Case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryPortifoliosRepository = new InMemoryPortifoliosRepository(
      inMemoryUsersRepository,
    )
    sut = new FetchRecentPortifolioUseCase(inMemoryPortifoliosRepository)
  })

  it('should be able to fetch recent portifolios', async () => {
    const user = makeUser({}, new UniqueEntityID('user-01'))
    inMemoryUsersRepository.items.push(user)

    const portifolio1 = makePortifolio({
      userId: new UniqueEntityID('user-01'),
    })
    const portifolio2 = makePortifolio({
      userId: new UniqueEntityID('user-01'),
    })

    inMemoryPortifoliosRepository.items.push(portifolio1)
    inMemoryPortifoliosRepository.items.push(portifolio2)

    const result = await sut.execute({ page: 1 })

    expect(result.value?.portifolios).toHaveLength(2)
    expect(result.value?.portifolios).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          userName: user.name,
          userLastName: user.lastName,
          title: portifolio1.title,
        }),
        expect.objectContaining({
          userName: user.name,
          userLastName: user.lastName,
          title: portifolio1.title,
        }),
      ]),
    )
  })

  it('should fetch 20 itens per page', async () => {
    const user = makeUser({}, new UniqueEntityID('user-01'))
    inMemoryUsersRepository.items.push(user)

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
