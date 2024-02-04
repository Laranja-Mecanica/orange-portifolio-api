import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { makeEditPortifolioUseCase } from '@/domain/application/use-cases/factories/make-edit-portifolio-use-case'
import { Request, Response } from 'express'
import { ZodError, z } from 'zod'
import { fromZodError } from 'zod-validation-error'

export const editPortifolio = async (req: Request, res: Response) => {
  const editPortifolioParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const editPortifolioBodySchema = z.object({
    title: z.string().max(25),
    description: z.string().max(120),
    link: z.string().url(),
    thumbKey: z.string().url(),
    tags: z.array(z.enum(['UX', 'UI', 'Web', 'Mobile'])).length(2),
  })

  try {
    const { id } = editPortifolioParamsSchema.parse(req.params)

    const { title, description, link, tags, thumbKey } =
      editPortifolioBodySchema.parse(req.body)

    const userId = req.payload?.tokenPayload.sub

    if (!userId) {
      return res.status(401).json({ message: 'Not allowed' })
    }

    const editportifolioUseCase = makeEditPortifolioUseCase()

    const result = await editportifolioUseCase.execute({
      portifolioId: id,
      title,
      description,
      link,
      tags,
      thumbKey,
      userId,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case ResourceNotFoundError:
          return res.status(404).json({
            statusCode: 404,
            message: error.message,
          })
        default:
          return res.status(500).json({
            statusCode: 500,
            message: 'Internal server error',
          })
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
