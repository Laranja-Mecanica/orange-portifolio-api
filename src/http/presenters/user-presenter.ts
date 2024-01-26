import { User } from '@/domain/entities/user'

export class UserPresenter {
  static toHTTP(user: User) {
    return {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
    }
  }
}
