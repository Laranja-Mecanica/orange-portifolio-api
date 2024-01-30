import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { makeDeletePortifolioUseCase } from '@/domain/application/use-cases/factories/make-delete-portifolio-use-case'
import { Request, Response } from 'express'
import { z } from 'zod'

export const deletePortifolio = async (req: Request, res: Response) => {
  const deletePortifolioParamsSchema = z.object({
    id: z.string(),
  })

  const { id } = deletePortifolioParamsSchema.parse(req.params)

  const userId = req.payload?.tokenPayload.sub

  if (!userId) {
    return res.status(401).json({ message: 'Not allowed' })
  }

  const deleteportifolioUseCase = makeDeletePortifolioUseCase()

  const result = await deleteportifolioUseCase.execute({
    id,
    userId,
  })

  if (result.isLeft()) {
    const error = result.value

    switch (error.constructor) {
      case ResourceNotFoundError:
        return res.status(404).json({ message: error.message })
      case NotAllowedError:
        return res.status(401).json({ message: error.message })
      default:
        return res.status(500).json({ message: 'Internal server error' })
    }
  }

  return res.status(204).json({})
}
