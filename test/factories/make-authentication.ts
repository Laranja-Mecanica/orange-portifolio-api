import { env } from '@/env'
import { sign } from 'jsonwebtoken'

export function makeAuthentication(id: string) {
  const token = sign({ sub: id }, env.JWT_PVK, { expiresIn: '8h' })
  return token
}
