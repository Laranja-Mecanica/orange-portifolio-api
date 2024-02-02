import { env } from '@/env'
import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

interface JwtPayload {
  sub: string
}

export const authorize = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.session.cookie.signed === true) {
    next()
  } else {
    const { authorization } = req.headers
    if (!authorization) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const token = authorization.split(' ')[1]

    const payload = verify(token, env.JWT_PVK) as JwtPayload

    req.payload = { tokenPayload: payload }

    if (!payload.sub) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    next()
  }
}
