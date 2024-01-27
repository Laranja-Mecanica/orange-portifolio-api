import { makeUser } from 'test/factories/make-user'
import { InMemoryUsersRepository } from 'test/respositories/in-memory-users-repository'
import { GetUserProfileByIdUseCase } from './get-user-profile-by-id'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: GetUserProfileByIdUseCase

describe('Get User Profile by Id Use Case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileByIdUseCase(inMemoryUsersRepository)
  })

  it('should be able to get user profile by id', async () => {
    const createdUser = makeUser()

    inMemoryUsersRepository.items.push(createdUser)

    const userId = createdUser.id.toString()

    const result = await sut.execute({
      id: userId,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toMatchObject({
      user: expect.objectContaining({
        id: createdUser.id,
      }),
    })
  })
})
