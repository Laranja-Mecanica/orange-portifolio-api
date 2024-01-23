import {
  Portifolio,
  PotifoliosRepository,
} from '@/repositories/portifolios-repository'

export class InMemoryPortifoliosRepository implements PotifoliosRepository {
  public items: Portifolio[] = []

  async create(portifolio: Portifolio) {
    this.items.push(portifolio)

    return portifolio
  }
}
