import { Portifolio } from '@/domain/entities/portifolio'
import { PortfolioWithUser } from '@/domain/entities/value-objects/portfolio-with-user'

export interface PortifoliosRepository {
  findByIdWithUser(id: string): Promise<PortfolioWithUser | null>
  findManyByUserIdWithUser(
    userId: string,
    page: number,
  ): Promise<PortfolioWithUser[]>
  findManyRecentWithUser(page: number): Promise<PortfolioWithUser[]>
  findManyByUserId(userId: string, page: number): Promise<Portifolio[]>
  findManyRecent(page: number): Promise<Portifolio[]>
  findById(id: string): Promise<Portifolio | null>
  create(portifolio: Portifolio): Promise<void>
  save(portifolio: Portifolio): Promise<void>
  delete(id: string): Promise<void>
}
