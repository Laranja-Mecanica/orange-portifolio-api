import { env } from '@/env'
import { NextFunction, Request, Response } from 'express'
import { sign, verify } from 'jsonwebtoken'

interface JwtPayload {
  sub: string
}

export const authorize = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { authorization } = req.headers

  if (req.user) {
    const token = sign(req.sessionID, env.JWT_PVK, { expiresIn: '8h' })
    const payload = verify(token, env.JWT_PVK) as JwtPayload

    req.payload = { tokenPayload: payload }

    next()
  } else {
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
