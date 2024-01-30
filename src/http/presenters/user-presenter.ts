import { User } from '@/domain/entities/user'

export class UserPresenter {
  static toHTTP(user: User) {
    return {
      name: user.name,
      lastName: user.lastName,
      country: user.country,
      email: user.email,
    }
  }
}
