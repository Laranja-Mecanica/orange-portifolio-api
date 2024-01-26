import { PrismaUsersRespository } from '@/http/prisma/repositories/prisma-users-repository'
import { GetUserProfileByIdUseCase } from '../get-user-profile-by-id'

export const makeGetUserProfileByIdUseCase = () => {
  const userRepository = new PrismaUsersRespository()
  const useCase = new GetUserProfileByIdUseCase(userRepository)

  return useCase
}
