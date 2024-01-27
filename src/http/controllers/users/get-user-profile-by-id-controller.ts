import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { makeGetUserProfileByIdUseCase } from '@/domain/application/use-cases/factories/make-get-user-profile-by-id'
import { UserPresenter } from '@/http/presenters/user-presenter'
import { Request, Response } from 'express'
import { z } from 'zod'

export const getUserProfileById = async (req: Request, res: Response) => {
  const getUserProfileByIdParamsSchema = z.object({
    id: z.string(),
  })

  const { id } = getUserProfileByIdParamsSchema.parse(req.params)

  const getUserProfileById = makeGetUserProfileByIdUseCase()

  const result = await getUserProfileById.execute({
    id,
  })

  if (result.isLeft()) {
    const error = result.value

    switch (error.constructor) {
      case ResourceNotFoundError:
        return res.status(404).json({ message: error.message })

      default:
        return res.status(500).json({ message: 'Internal server error' })
    }
  }

  const { user } = result.value

  return res.status(200).json({ user: UserPresenter.toHTTP(user) })
}
