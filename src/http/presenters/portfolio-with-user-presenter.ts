import { PortfolioWithUser } from '@/domain/entities/value-objects/portfolio-with-user'

export class PortifolioWithUserPresenter {
  static toHTTP(portfolioWithUser: PortfolioWithUser) {
    return {
      portfolioId: portfolioWithUser.portfolioId.toString(),
      title: portfolioWithUser.title,
      description: portfolioWithUser.description,
      link: portfolioWithUser.link,
      tags: portfolioWithUser.tags,
      thumbUrl: portfolioWithUser.thumbKey,
      createdAt: portfolioWithUser.createdAt,
      userName: portfolioWithUser.userName,
      lastName: portfolioWithUser.userLastName,
    }
  }
}
