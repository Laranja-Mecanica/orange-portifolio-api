import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { makeDeletePortifolioUseCase } from '@/domain/application/use-cases/factories/make-delete-portifolio-use-case'
import { customRequest } from '@/http/midllewares/authenticate'
import { Response } from 'express'
import { z } from 'zod'

export const deletePortifolio = async (req: customRequest, res: Response) => {
  const deletePortifolioParamsSchema = z.object({
    id: z.string(),
  })

  const { id } = deletePortifolioParamsSchema.parse(req.params)

  const userId = req.userId

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

      default:
        return res.status(500).json({ message: 'Internal server error' })
    }
  }

  return res.status(204).json({})
}
