import { Portifolio } from '@/domain/entities/portifolio'

export class PortifolioPresenter {
  static toHTTP(portifolio: Portifolio) {
    return {
      id: portifolio.id.toString(),
      title: portifolio.title,
      description: portifolio.description,
      link: portifolio.link,
      tags: portifolio.tags,
      createdAt: portifolio.createdAt,
    }
  }
}
