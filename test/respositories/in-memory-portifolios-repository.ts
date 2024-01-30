import { PortifoliosRepository } from '@/domain/application/repositories/portifolios-repository'
import { Portifolio } from '@/domain/entities/portifolio'

export class InMemoryPortifoliosRepository implements PortifoliosRepository {
  public items: Portifolio[] = []

  async findManyByUserId(userId: string, page: number) {
    const portifolios = this.items
      .filter((item) => item.userId.toString() === userId)
      .slice((page - 1) * 20, page * 20)

    return portifolios
  }

  async findById(id: string) {
    const portifolio = this.items.find((item) => item.id.toString() === id)

    if (!portifolio) {
      return null
    }

    return portifolio
  }

  async create(portifolio: Portifolio) {
    this.items.push(portifolio)
  }

  async save(portifolio: Portifolio) {
    const itemIndex = this.items.findIndex((item) => item.id === portifolio.id)

    this.items[itemIndex] = portifolio
  }

  async delete(id: string) {
    const itemIndex = this.items.findIndex((item) => item.id.toString() === id)

    this.items.splice(itemIndex, 1)
  }
}
