import { UserAlreadyExistsError } from '@/domain/application/use-cases/errors/user-already-exists-error'
import { makeRegisterUseCase } from '@/domain/application/use-cases/factories/make-register-use-case'
import { Request, Response } from 'express'
import { ZodError, z } from 'zod'
import { fromZodError } from 'zod-validation-error'

export const register = async (req: Request, res: Response) => {
  const registerBodySchema = z.object({
    name: z.string(),
    lastName: z.string(),
    country: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  try {
    const { name, lastName, country, email, password } =
      registerBodySchema.parse(req.body)

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
          return res.status(422).json({
            statusCode: 422,
            message: error.message,
          })

        default:
          return res.status(500).json({
            statusCode: 500,
            message: 'Internal server error',
          })
      }
    }

    return res.status(201).json({ message: 'User sucessful created' })
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
