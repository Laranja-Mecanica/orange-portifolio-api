import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { makeEditPortifolioUseCase } from '@/domain/application/use-cases/factories/make-edit-portifolio-use-case'
import { customRequest } from '@/http/midllewares/authenticate'
import { Response } from 'express'
import { z } from 'zod'

export const editPortifolio = async (req: customRequest, res: Response) => {
  const editPortifolioParamsSchema = z.object({
    id: z.string(),
  })

  const editPortifolioBodySchema = z.object({
    title: z.string(),
    description: z.string(),
    link: z.string(),
    tags: z.array(z.enum(['UX', 'UI', 'Web', 'Mobile'])).length(2),
  })

  const { id } = editPortifolioParamsSchema.parse(req.params)
  const { title, description, link, tags } = editPortifolioBodySchema.parse(
    req.body,
  )
  const userId = req.userId

  const editportifolioUseCase = makeEditPortifolioUseCase()

  const result = await editportifolioUseCase.execute({
    portifolioId: id,
    title,
    description,
    link,
    tags,
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
