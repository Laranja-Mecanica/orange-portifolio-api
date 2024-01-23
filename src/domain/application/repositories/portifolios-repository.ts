import { Portifolio } from '@/domain/entities/portifolio'

export interface PortifoliosRepository {
  findById(id: string): Promise<Portifolio | null>
  create(portifolio: Portifolio): Promise<Portifolio>
  save(portifolio: Portifolio): Promise<Portifolio>
  delete(id: string): Promise<void>
}
