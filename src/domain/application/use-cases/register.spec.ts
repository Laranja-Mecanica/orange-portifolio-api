import { compare } from 'bcrypt'
import { InMemoryUsersRepository } from 'test/respositories/in-memory-users-repository'
import { RegisterUseCase } from './register'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(inMemoryUsersRepository)
  })

  it('should be able to register an user', async () => {
    const result = await sut.execute({
      name: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(inMemoryUsersRepository.items).toHaveLength(1)
    expect(result.isRight()).toBe(true)
  })

  it('should be able to hash the user password upon registration', async () => {
    await sut.execute({
      name: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const isPasswordHashed = await compare(
      '123456',
      inMemoryUsersRepository.items[0].password,
    )

    expect(inMemoryUsersRepository.items).toHaveLength(1)
    expect(isPasswordHashed).toBe(true)
  })
})
