import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { makeGetPortifolioByIdUseCase } from '@/domain/application/use-cases/factories/make-get-portifolio-by-id-use-case'
import { PortifolioWithUserPresenter } from '@/http/presenters/portfolio-with-user-presenter'
import { Request, Response } from 'express'
import { ZodError, z } from 'zod'
import { fromZodError } from 'zod-validation-error'

export const getPortifolioById = async (req: Request, res: Response) => {
  const getPortifolioByIdParamsSchema = z.object({
    id: z.string().uuid(),
  })

  try {
    const { id } = getPortifolioByIdParamsSchema.parse(req.params)

    const getPortifolioByIdUseCase = makeGetPortifolioByIdUseCase()

    const result = await getPortifolioByIdUseCase.execute({
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

    const { portifolio } = result.value

    return res
      .status(200)
      .json({ portifolio: PortifolioWithUserPresenter.toHTTP(portifolio) })
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
