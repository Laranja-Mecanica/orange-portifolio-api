import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface PortifolioProps {
  userId: UniqueEntityID
  title: string
  link: string
  description: string
  createdAt: Date
}

export class Portifolio extends Entity<PortifolioProps> {
  get userId() {
    return this.props.userId
  }

  get title() {
    return this.props.title
  }

  set title(title: string) {
    this.props.title = title
  }

  get link() {
    return this.props.link
  }

  set link(link: string) {
    this.props.link = link
  }

  get description() {
    return this.props.description
  }

  set description(description: string) {
    this.props.description = description
  }

  get createdAt() {
    return this.props.createdAt
  }

  static create(
    props: Optional<PortifolioProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const portifolio = new Portifolio(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return portifolio
  }
}
