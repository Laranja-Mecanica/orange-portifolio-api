import { makeFetchPortifolioUseCase } from '@/domain/application/use-cases/factories/make-fetch-user-portifolios'
import { PortifolioWithUserPresenter } from '@/http/presenters/portfolio-with-user-presenter'
import { Request, Response } from 'express'
import { ZodError, z } from 'zod'
import { fromZodError } from 'zod-validation-error'

export const fetchUserPortifolio = async (req: Request, res: Response) => {
  const fetchPortifolioParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const fetchPortifolioQuerySchema = z.object({
    page: z
      .string()
      .optional()
      .default('1')
      .transform(Number)
      .pipe(z.number().min(1)),
  })

  try {
    const { id } = fetchPortifolioParamsSchema.parse(req.params)

    const { page } = fetchPortifolioQuerySchema.parse(req.query)

    const fetchUserPortifolioUseCase = makeFetchPortifolioUseCase()

    const result = await fetchUserPortifolioUseCase.execute({
      id,
      page,
    })

    if (result.isLeft()) {
      return res.status(500).json({
        statusCode: 500,
        message: 'Internal server error',
      })
    }

    const { portifolios } = result.value

    return res.status(200).json({
      portifolios: portifolios.map(PortifolioWithUserPresenter.toHTTP),
    })
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
