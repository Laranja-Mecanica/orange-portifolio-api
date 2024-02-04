import { PortifoliosRepository } from '@/domain/application/repositories/portifolios-repository'
import { Portifolio } from '@/domain/entities/portifolio'
import { PortfolioWithUser } from '@/domain/entities/value-objects/portfolio-with-user'
import { InMemoryUsersRepository } from './in-memory-users-repository'

export class InMemoryPortifoliosRepository implements PortifoliosRepository {
  constructor(private usersRepository: InMemoryUsersRepository) {}

  public items: Portifolio[] = []

  async findByIdWithUser(id: string) {
    const portifolio = this.items.find((item) => item.id.toString() === id)

    if (!portifolio) {
      return null
    }

    const user = this.usersRepository.items.find(
      (item) => item.id.toString() === portifolio.userId.toString(),
    )

    if (!user) {
      throw new Error(`User with ID ${portifolio.userId} does not exist.`)
    }

    return PortfolioWithUser.create({
      userId: portifolio.userId,
      userName: user.name,
      userLastName: user.lastName,
      title: portifolio.title,
      description: portifolio.description,
      link: portifolio.link,
      tags: portifolio.tags,
      thumbKey: portifolio.thumbKey,
      createdAt: portifolio.createdAt,
    })
  }

  async findManyByUserIdWithUser(userId: string, page: number) {
    const portifolios = this.items
      .filter((item) => item.userId.toString() === userId)
      .slice((page - 1) * 20, page * 20)
      .map((portifolio) => {
        const user = this.usersRepository.items.find(
          (user) => user.id.toString() === portifolio.userId.toString(),
        )

        if (!user) {
          throw new Error(
            `User with ID ${portifolio.userId.toString()} does not exist.`,
          )
        }

        return PortfolioWithUser.create({
          userId: portifolio.userId,
          userName: user.name,
          userLastName: user.lastName,
          title: portifolio.title,
          description: portifolio.description,
          link: portifolio.link,
          tags: portifolio.tags,
          thumbKey: portifolio.thumbKey,
          createdAt: portifolio.createdAt,
        })
      })

    return portifolios
  }

  async findManyRecentWithUser(page: number) {
    const portifolios = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)
      .map((portifolio) => {
        const user = this.usersRepository.items.find(
          (user) => user.id.toString() === portifolio.userId.toString(),
        )

        if (!user) {
          throw new Error(
            `User with ID ${portifolio.userId.toString()} does not exist.`,
          )
        }

        return PortfolioWithUser.create({
          userId: portifolio.userId,
          userName: user.name,
          userLastName: user.lastName,
          title: portifolio.title,
          description: portifolio.description,
          link: portifolio.link,
          tags: portifolio.tags,
          thumbKey: portifolio.thumbKey,
          createdAt: portifolio.createdAt,
        })
      })

    return portifolios
  }

  async findManyByUserId(userId: string, page: number) {
    const portifolios = this.items
      .filter((item) => item.userId.toString() === userId)
      .slice((page - 1) * 20, page * 20)

    return portifolios
  }

  async findManyRecent(page: number) {
    const portifolios = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
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
