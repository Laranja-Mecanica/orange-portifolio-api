import { WrongCredentialsError } from '@/domain/application/use-cases/errors/wrong-credentials-error'
import { makeAuthenticateUseCase } from '@/domain/application/use-cases/factories/make-authenticate-use-case'
import { Request, Response } from 'express'
import { z } from 'zod'

export const authenticate = async (req: Request, res: Response) => {
  const authenticateBodySchema = z.object({
    email: z.string(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(req.body)

  const authenticateUseCase = makeAuthenticateUseCase()

  const result = await authenticateUseCase.execute({
    email,
    password,
  })

  if (result.isLeft()) {
    const error = result.value

    switch (error.constructor) {
      case WrongCredentialsError:
        return res.status(401).json({ message: error.message })

      default:
        return res.status(500).json({ message: 'Internal server error' })
    }
  }

  const { accessToken } = result.value

  return res.status(200).json({ accessToken })
}
