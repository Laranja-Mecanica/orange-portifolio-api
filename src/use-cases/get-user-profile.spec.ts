import { InMemoryUsersRepository } from 'test/respositories/in-memory-users-repository'
import { GetUserProfileUseCase } from './get-user-profile'
import { randomUUID } from 'crypto'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(inMemoryUsersRepository)
  })

  it('should be able to get user profile', async () => {
    const createdUser = await inMemoryUsersRepository.create({
      id: randomUUID(),
      name: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const { user } = await sut.execute({
      userId: createdUser.id,
    })

    expect(inMemoryUsersRepository.items[0]).toEqual(user)
  })
})
