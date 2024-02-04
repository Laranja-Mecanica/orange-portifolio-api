import { makeFetchRecentPortifolioUseCase } from '@/domain/application/use-cases/factories/make-fetch-recent-portfolios'
import { PortifolioWithUserPresenter } from '@/http/presenters/portfolio-with-user-presenter'
import { Request, Response } from 'express'
import { z } from 'zod'

export const fetchRecentPortifolios = async (req: Request, res: Response) => {
  const fetchPortifolioQuerySchema = z.object({
    page: z
      .string()
      .optional()
      .default('1')
      .transform(Number)
      .pipe(z.number().min(1)),
  })

  const { page } = fetchPortifolioQuerySchema.parse(req.query)

  const fetchRecentPortifoliosUseCase = makeFetchRecentPortifolioUseCase()

  const result = await fetchRecentPortifoliosUseCase.execute({
    page,
  })

  if (result.isLeft()) {
    return res.status(500).json({ message: 'Internal server error' })
  }

  const { portifolios } = result.value

  return res.status(200).json({
    portifolios: portifolios.map(PortifolioWithUserPresenter.toHTTP),
  })
}
