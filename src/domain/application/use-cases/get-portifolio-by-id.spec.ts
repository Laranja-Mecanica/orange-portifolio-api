import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makePortifolio } from 'test/factories/make-portifolio'
import { makeUser } from 'test/factories/make-user'
import { InMemoryPortifoliosRepository } from 'test/respositories/in-memory-portifolios-repository'
import { InMemoryUsersRepository } from 'test/respositories/in-memory-users-repository'
import { GetPortifolioByIdUseCase } from './get-portifolio-by-id'

let inMemoryPortifoliosRepository: InMemoryPortifoliosRepository
let inMemoryUsersRepository: InMemoryUsersRepository
let sut: GetPortifolioByIdUseCase

describe('Get Portifolio by Id Use Case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryPortifoliosRepository = new InMemoryPortifoliosRepository(
      inMemoryUsersRepository,
    )
    sut = new GetPortifolioByIdUseCase(inMemoryPortifoliosRepository)
  })

  it('should be able to get a portifolio by id', async () => {
    const user = makeUser({}, new UniqueEntityID('teste'))
    const portifolio = makePortifolio({ userId: new UniqueEntityID('teste') })

    await inMemoryPortifoliosRepository.create(portifolio)
    await inMemoryUsersRepository.create(user)

    const portifolioId = portifolio.id.toString()

    const result = await sut.execute({
      id: portifolioId,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toMatchObject({
      portifolio: expect.objectContaining({
        userName: user.name,
        userLastName: user.lastName,
        title: portifolio.title,
        tags: portifolio.tags,
        thumbKey: portifolio.thumbKey,
      }),
    })
  })
})
