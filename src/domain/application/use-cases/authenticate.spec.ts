import { makeUser } from 'test/factories/make-user'
import { InMemoryUsersRepository } from 'test/respositories/in-memory-users-repository'
import { FakeEncrypter } from 'test/test/cryptography/fake-encrypter'
import { FakeHasher } from 'test/test/cryptography/fake-hasher'
import { Encrypter } from '../cryptography/encrypter'
import { Hasher } from '../cryptography/hasher'
import { AuthenticateUseCase } from './authenticate'
import { WrongCredentialsError } from './errors/wrong-credentials-error'

let inMemoryUsersRepository: InMemoryUsersRepository
let fakeHasher: Hasher
let fakeEncrypter: Encrypter
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    fakeHasher = new FakeHasher()
    fakeEncrypter = new FakeEncrypter()
    sut = new AuthenticateUseCase(
      inMemoryUsersRepository,
      fakeHasher,
      fakeEncrypter,
    )
  })

  it('should be able to authenticate user', async () => {
    const hashedPassword = await fakeHasher.hash('123456')

    const newUser = makeUser({
      email: 'johndoe@example.com',
      password: hashedPassword,
    })

    inMemoryUsersRepository.items.push(newUser)

    const result = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toMatchObject({
      accessToken: expect.any(String),
    })
  })

  it('should not be able to authenticate with wrong email', async () => {
    const newUser = makeUser({
      email: 'johndoe@example.com',
    })

    inMemoryUsersRepository.items.push(newUser)

    const result = await sut.execute({
      email: 'wrong-email@example.com',
      password: '123456',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(WrongCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    const hashedPassword = await fakeHasher.hash('123456')

    const newUser = makeUser({
      email: 'johndoe@example.com',
      password: hashedPassword,
    })

    inMemoryUsersRepository.items.push(newUser)

    const result = await sut.execute({
      email: 'johndoe@example.com',
      password: 'wrong-password',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(WrongCredentialsError)
  })
})
