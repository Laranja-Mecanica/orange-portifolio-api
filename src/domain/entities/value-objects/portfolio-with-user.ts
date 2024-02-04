import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ValueObject } from '@/core/entities/value-object'

interface PortfolioWithUserProps {
  userId: UniqueEntityID
  userName: string
  userLastName: string
  title: string
  link: string
  description: string
  tags: string[]
  thumbKey: string
  createdAt: Date
}

export class PortfolioWithUser extends ValueObject<PortfolioWithUserProps> {
  get userId() {
    return this.props.userId
  }

  get userName() {
    return this.props.userName
  }

  get userLastName() {
    return this.props.userLastName
  }

  get title() {
    return this.props.title
  }

  get link() {
    return this.props.link
  }

  get description() {
    return this.props.description
  }

  get tags() {
    return this.props.tags
  }

  get thumbKey() {
    return this.props.thumbKey
  }

  get createdAt() {
    return this.props.createdAt
  }

  static create(props: PortfolioWithUserProps) {
    return new PortfolioWithUser(props)
  }
}
