import { BcryptHasher } from '@/http/cryptography/bcrypt-hasher'
import { JwtEncrypter } from '@/http/cryptography/jwt-encrypter'
import { PrismaUsersRespository } from '@/http/prisma/repositories/prisma-users-repository'
import { AuthenticateUseCase } from '../authenticate'

export const makeAuthenticateUseCase = () => {
  const userRepository = new PrismaUsersRespository()
  const hasher = new BcryptHasher()
  const encrypter = new JwtEncrypter()
  const useCase = new AuthenticateUseCase(userRepository, hasher, encrypter)

  return useCase
}
