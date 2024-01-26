import { makePortifolio } from 'test/factories/make-portifolio'
import { InMemoryPortifoliosRepository } from 'test/respositories/in-memory-portifolios-repository'
import { GetPortifolioByIdUseCase } from './get-portifolio-by-id'

let inMemoryPortifoliosRepository: InMemoryPortifoliosRepository
let sut: GetPortifolioByIdUseCase

describe('Get Portifolio by Id Use Case', () => {
  beforeEach(() => {
    inMemoryPortifoliosRepository = new InMemoryPortifoliosRepository()
    sut = new GetPortifolioByIdUseCase(inMemoryPortifoliosRepository)
  })

  it('should be able to get a portifolio by id', async () => {
    const portifolio = makePortifolio()

    await inMemoryPortifoliosRepository.create(portifolio)

    const portifolioId = portifolio.id.toString()

    const result = await sut.execute({
      id: portifolioId,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toMatchObject({
      portifolio: inMemoryPortifoliosRepository.items[0],
    })
  })
})
