export interface Portifolio {
  id: string
  title: string
  tag: string
  link: string
  description: string
}

export interface PortifoliosRepository {
  findById(id: string): Promise<Portifolio | null>
  create(portifolio: Portifolio): Promise<Portifolio>
  save(portifolio: Portifolio): Promise<Portifolio>
}
