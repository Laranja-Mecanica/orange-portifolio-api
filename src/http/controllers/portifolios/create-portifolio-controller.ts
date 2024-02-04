import { makeCreatePortifolioUseCase } from '@/domain/application/use-cases/factories/make-create-portifolio-use-case'
import { Request, Response } from 'express'
import { ZodError, z } from 'zod'
import { fromZodError } from 'zod-validation-error'

export const createPortifolio = async (req: Request, res: Response) => {
  const createPortifolioBodySchema = z.object({
    title: z.string().max(25),
    description: z.string().max(120),
    link: z.string().url(),
    thumbKey: z.string().url(),
    tags: z.array(z.enum(['UX', 'UI', 'Web', 'Mobile'])).length(2),
  })

  try {
    const { title, description, link, tags, thumbKey } =
      createPortifolioBodySchema.parse(req.body)

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
      thumbKey,
      tags,
    })

    if (result.isLeft()) {
      return res.status(500).json({
        statusCode: 500,
        message: 'Internal server error',
      })
    }

    return res.status(201).json({})
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
