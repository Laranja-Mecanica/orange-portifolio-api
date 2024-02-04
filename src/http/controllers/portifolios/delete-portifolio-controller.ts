import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { makeDeletePortifolioUseCase } from '@/domain/application/use-cases/factories/make-delete-portifolio-use-case'
import { Request, Response } from 'express'
import { ZodError, z } from 'zod'
import { fromZodError } from 'zod-validation-error'

export const deletePortifolio = async (req: Request, res: Response) => {
  const deletePortifolioParamsSchema = z.object({
    id: z.string().uuid(),
  })

  try {
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
          return res
            .status(404)
            .json({ statusCode: 404, message: error.message })
        case NotAllowedError:
          return res
            .status(401)
            .json({ statusCode: 401, message: error.message })
        default:
          return res
            .status(500)
            .json({ statusCode: 500, message: 'Internal server error' })
      }
    }

    return res.status(204).json({})
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: 'Validation failed',
        statusCode: 400,
        errors: fromZodError(error).toString(),
      })
    }

    return res.status(500).json({
      statusCode: 500,
      message: 'Internal server error',
    })
  }
}
