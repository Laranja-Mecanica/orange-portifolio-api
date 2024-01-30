import { makeCreatePortifolioUseCase } from '@/domain/application/use-cases/factories/make-create-portifolio-use-case'
import { Request, Response } from 'express'
import { z } from 'zod'

export const createPortifolio = async (req: Request, res: Response) => {
  const createPortifolioBodySchema = z.object({
    title: z.string(),
    description: z.string(),
    link: z.string(),
  })

  const { title, description, link } = createPortifolioBodySchema.parse(
    req.body,
  )

  const createPortifolioUseCase = makeCreatePortifolioUseCase()

  const userId = req.payload?.tokenPayload.sub

  if (!userId) {
    return res.status(401).json({ message: 'Not allowed' })
  }

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
