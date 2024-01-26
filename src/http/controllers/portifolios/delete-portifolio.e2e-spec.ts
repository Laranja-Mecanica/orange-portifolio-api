import { getPrisma } from '@/http/prisma/prisma'
import { Server, createServer } from 'http'
import request from 'supertest'
import { makePrismaPortifolio } from 'test/factories/make-portifolio'
import { makePrismaUser } from 'test/factories/make-user'

let server: Server

describe('Delete Portifolio (E2E)', () => {
  beforeAll(async () => {
    const { app } = await import('@/app')
    server = createServer(app)
  })

  afterAll(() => {
    server.close()
  })

  test('[DELETE] /portifolios/:id', async () => {
    const user = await makePrismaUser()

    const portifolio = await makePrismaPortifolio({
      userId: user.id,
    })

    const portifolioId = portifolio.id.toString()

    const response = await request(server)
      .delete(`/portifolios/${portifolioId}`)
      .send({})

    expect(response.statusCode).toBe(204)

    const prisma = getPrisma()

    const portifolioOnDatabase = await prisma.portifolio.findFirst()

    expect(portifolioOnDatabase).toBeFalsy()
  })
})
