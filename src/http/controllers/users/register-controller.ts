import { UserAlreadyExistsError } from '@/domain/application/use-cases/errors/user-already-exists-error'
import { makeRegisterUseCase } from '@/domain/application/use-cases/factories/make-register-use-case'
import { Request, Response } from 'express'
import { z } from 'zod'

export const register = async (req: Request, res: Response) => {
  const registerBodySchema = z.object({
    name: z.string(),
    lastName: z.string(),
    country: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, lastName, country, email, password } = registerBodySchema.parse(
    req.body,
  )

  const registerUseCase = makeRegisterUseCase()

  const result = await registerUseCase.execute({
    name,
    lastName,
    country,
    email,
    password,
  })

  if (result.isLeft()) {
    const error = result.value

    switch (error.constructor) {
      case UserAlreadyExistsError:
        return res.status(422).json({ message: error.message })

      default:
        return res.status(500).json({ message: 'Internal server error' })
    }
  }

  return res.status(201).json({ message: 'User sucessful created' })
}
