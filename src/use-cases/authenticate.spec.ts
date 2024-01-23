import { InMemoryUsersRepository } from 'test/respositories/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcrypt'
import { randomUUID } from 'node:crypto'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(inMemoryUsersRepository)
  })

  it('should be able to login an user', async () => {
    const password = await hash('123456', 10)

    inMemoryUsersRepository.items.push({
      id: randomUUID(),
      name: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      password,
    })

    const { user } = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(inMemoryUsersRepository.items[0]).toEqual(user)
  })

  it('should not be able to login with wrong email', async () => {
    const password = await hash('123456', 10)

    inMemoryUsersRepository.items.push({
      id: randomUUID(),
      name: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      password,
    })
    await expect(() =>
      sut.execute({
        email: 'wrongEmail@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should not be able to login with wrong password', async () => {
    const password = await hash('123456', 10)

    inMemoryUsersRepository.items.push({
      id: randomUUID(),
      name: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      password,
    })
    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: 'wrongPassword',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
