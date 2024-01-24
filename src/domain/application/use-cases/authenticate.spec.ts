import { hash } from 'bcrypt'
import { makeUser } from 'test/factories/make-user'
import { InMemoryUsersRepository } from 'test/respositories/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(inMemoryUsersRepository)
  })

  it('should be able to authenticate user', async () => {
    const hashedPassword = await hash('123456', 10)

    const newUser = makeUser({
      email: 'johndoe@example.com',
      password: hashedPassword,
    })

    inMemoryUsersRepository.items.push(newUser)

    const { user } = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(inMemoryUsersRepository.items[0]).toEqual(user)
  })

  it('should not be able to authenticate with wrong email', async () => {
    const newUser = makeUser({
      email: 'johndoe@example.com',
    })

    inMemoryUsersRepository.items.push(newUser)

    await expect(() =>
      sut.execute({
        email: 'wrong-email@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should not be able to authenticate with wrong password', async () => {
    const hashedPassword = await hash('123456', 10)

    const newUser = makeUser({
      email: 'johndoe@example.com',
      password: hashedPassword,
    })

    inMemoryUsersRepository.items.push(newUser)

    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
