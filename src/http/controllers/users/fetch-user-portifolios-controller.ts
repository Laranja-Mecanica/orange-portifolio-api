import { makeFetchPortifolioUseCase } from '@/domain/application/use-cases/factories/make-fetch-user-portifolios'
import { Request, Response } from 'express'
import { z } from 'zod'

export const fetchUserPortifolio = async (req: Request, res: Response) => {
  const fetchPortifolioParamsSchema = z.object({
    id: z.string(),
  })
  const { id } = fetchPortifolioParamsSchema.parse(req.params)

  const fetchUserPortifolioUseCase = makeFetchPortifolioUseCase()

  const result = await fetchUserPortifolioUseCase.execute({
    id,
  })

  if (result.isLeft()) {
    return res.status(500).json({ message: 'Internal server error' })
  }

  const { portifolios } = result.value

  return res.status(200).json({ portifolios })
}
