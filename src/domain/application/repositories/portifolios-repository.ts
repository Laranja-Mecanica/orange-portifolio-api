import { Portifolio } from '@/domain/entities/portifolio'

export interface PortifoliosRepository {
  findManyByUserId(userId: string): Promise<Portifolio[]>
  findById(id: string): Promise<Portifolio | null>
  create(portifolio: Portifolio): Promise<void>
  save(portifolio: Portifolio): Promise<void>
  delete(id: string): Promise<void>
}
