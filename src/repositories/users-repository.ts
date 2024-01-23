export interface User {
  id: string
  name: string
  lastName: string
  email: string
  password: string
}

export interface UsersRepository {
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  create(user: User): Promise<User>
}
