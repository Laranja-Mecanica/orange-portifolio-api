import { makeUser } from 'test/factories/make-user'
import { InMemoryUsersRepository } from 'test/respositories/in-memory-users-repository'
import { GetUserProfileUseCase } from './get-user-profile'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(inMemoryUsersRepository)
  })

  it('should be able to get user profile', async () => {
    const createdUser = makeUser()

    inMemoryUsersRepository.items.push(createdUser)

    const userId = createdUser.id.toString()

    const { user } = await sut.execute({
      userId,
    })

    expect(inMemoryUsersRepository.items[0]).toEqual(user)
  })
})
