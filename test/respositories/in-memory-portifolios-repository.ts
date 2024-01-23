import {
  Portifolio,
  PortifoliosRepository,
} from '@/repositories/portifolios-repository'

export class InMemoryPortifoliosRepository implements PortifoliosRepository {
  public items: Portifolio[] = []

  async findById(id: string) {
    const portifolio = this.items.find((item) => item.id === id)

    if (!portifolio) {
      return null
    }

    return portifolio
  }

  async create(portifolio: Portifolio) {
    this.items.push(portifolio)

    return portifolio
  }

  async save(portifolio: Portifolio) {
    const itemIndex = this.items.findIndex((item) => item.id === portifolio.id)

    this.items[itemIndex] = portifolio

    return portifolio
  }
}
