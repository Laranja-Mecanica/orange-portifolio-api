import { PrismaUsersRespository } from '@/http/prisma/repositories/prisma-users-repository'
import { AuthenticateUseCase } from '../authenticate'

export const makeAuthenticateUseCase = () => {
  const userRepository = new PrismaUsersRespository()
  const useCase = new AuthenticateUseCase(userRepository)

  return useCase
}
