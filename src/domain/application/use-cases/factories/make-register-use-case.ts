import { BcryptHasher } from '@/http/cryptography/bcrypt-hasher'
import { PrismaUsersRespository } from '@/http/prisma/repositories/prisma-users-repository'
import { RegisterUseCase } from '../register'

export const makeRegisterUseCase = () => {
  const userRepository = new PrismaUsersRespository()
  const hasher = new BcryptHasher()
  const useCase = new RegisterUseCase(userRepository, hasher)

  return useCase
}
