import { makeCreatePortifolioUseCase } from '@/domain/application/use-cases/factories/make-create-portifolio-use-case'
import { customRequest } from '@/http/midllewares/authenticate'
import { Response } from 'express'
import { z } from 'zod'

export const createPortifolio = async (req: customRequest, res: Response) => {
  const createPortifolioBodySchema = z.object({
    title: z.string(),
    description: z.string(),
    link: z.string(),
  })

  const { title, description, link } = createPortifolioBodySchema.parse(
    req.body,
  )

  const createPortifolioUseCase = makeCreatePortifolioUseCase()
  const userId = req.userId

  const result = await createPortifolioUseCase.execute({
    userId,
    title,
    description,
    link,
  })

  if (result.isLeft()) {
    return res.status(500).json({ message: 'Internal server error' })
  }

  return res.status(201).json({})
}
