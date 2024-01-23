export interface User {
  name: string
  lastName: string
  email: string
  password: string
}

export interface UsersRepository {
  findByEmail(email: string): Promise<User | null>
  create(user: User): Promise<User>
}
