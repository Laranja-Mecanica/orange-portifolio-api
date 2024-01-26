import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface UserProps {
  name: string
  lastName: string
  email: string
  password: string
}

export class User extends Entity<UserProps> {
  get name() {
    return this.props.name
  }

  get lastName() {
    return this.props.lastName
  }

  get email() {
    return this.props.email
  }

  get password() {
    return this.props.password
  }

  // set password(password: string) {
  //   this.props.password = password
  // }

  static create(props: UserProps, id?: UniqueEntityID) {
    const user = new User({ ...props }, id)

    return user
  }
}
