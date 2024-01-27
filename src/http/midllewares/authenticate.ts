import { env } from '@/env'
import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

interface JwtPayload {
  sub: string
}

export interface customRequest extends Request {
  userId: string
}

export const authorize = async (
  req: customRequest,
  res: Response,
  next: NextFunction,
) => {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const token = authorization.split(' ')[1]

  const payload = verify(token, env.JWT_PVK) as JwtPayload

  req.userId = payload.sub

  if (!payload.sub) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
  next()
}
