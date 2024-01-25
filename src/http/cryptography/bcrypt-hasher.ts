import { Hasher } from '@/domain/application/cryptography/hasher'
import { compare, hash } from 'bcrypt'

export class BcryptHasher implements Hasher {
  private HASH_SALT_LENTH = 10

  async hash(plain: string) {
    return hash(plain, this.HASH_SALT_LENTH)
  }

  async compare(plain: string, hash: string) {
    return compare(plain, hash)
  }
}
