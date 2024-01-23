import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface PortifolioProps {
  title: string
  tag: string
  link: string
  description: string
}

export class Portifolio extends Entity<PortifolioProps> {
  static create(props: PortifolioProps, id?: UniqueEntityID) {
    const portifolio = new Portifolio({ ...props }, id)

    return portifolio
  }
}
