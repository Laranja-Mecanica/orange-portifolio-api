import { Encrypter } from '@/domain/application/cryptography/encrypter'
import { env } from '@/env'
import { sign } from 'jsonwebtoken'

export class JwtEncrypter implements Encrypter {
  async encrypt(payload: Record<string, unknown>) {
    return sign(payload, env.JWT_PVK, {
      expiresIn: '8h',
    })
  }
}
