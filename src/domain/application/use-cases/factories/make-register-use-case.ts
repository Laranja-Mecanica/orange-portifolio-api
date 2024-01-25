import { PrismaUsersRespository } from '@/http/prisma/repositories/prisma-users-repository'
import { RegisterUseCase } from '../register'

export const makeRegisterUseCase = () => {
  const userRepository = new PrismaUsersRespository()
  const useCase = new RegisterUseCase(userRepository)

  return useCase
}
