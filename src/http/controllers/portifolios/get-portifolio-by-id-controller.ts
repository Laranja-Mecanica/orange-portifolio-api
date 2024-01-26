import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { makeGetPortifolioByIdUseCase } from '@/domain/application/use-cases/factories/make-get-portifolio-by-id-use-case'
import { customRequest } from '@/http/midllewares/authenticate'
import { PortifolioPresenter } from '@/http/presenters/portifolio-presenter'
import { Response } from 'express'
import { z } from 'zod'

export const getPortifolioById = async (req: customRequest, res: Response) => {
  const getPortifolioByIdParamsSchema = z.object({
    id: z.string(),
  })

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
    .json({ portifolio: PortifolioPresenter.toHTTP(portifolio) })
}
