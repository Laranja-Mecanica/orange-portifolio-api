import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface PortifolioProps {
  title: string
  tag: string
  link: string
  description: string
}

export class Portifolio extends Entity<PortifolioProps> {
  get title() {
    return this.props.title
  }

  set title(title: string) {
    this.props.title = title
  }

  get tag() {
    return this.props.tag
  }

  set tag(tag: string) {
    this.props.tag = tag
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

  static create(props: PortifolioProps, id?: UniqueEntityID) {
    const portifolio = new Portifolio({ ...props }, id)

    return portifolio
  }
}
