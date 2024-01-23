export interface Portifolio {
  id: string
  title: string
  tag: string
  link: string
  description: string
}

export interface PotifoliosRepository {
  create(portifolio: Portifolio): Promise<Portifolio>
}
