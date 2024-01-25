import { Portifolio } from '@/domain/entities/portifolio'

export interface PortifoliosRepository {
  findById(id: string): Promise<Portifolio | null>
  create(portifolio: Portifolio): Promise<void>
  save(portifolio: Portifolio): Promise<void>
  delete(id: string): Promise<void>
}
