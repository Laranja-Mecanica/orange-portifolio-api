import { getPrisma } from '@/http/prisma/prisma'
import { Server, createServer } from 'http'
import request from 'supertest'
import { makeAuthentication } from 'test/factories/make-authentication'
import { makePrismaPortifolio } from 'test/factories/make-portifolio'
import { makePrismaUser } from 'test/factories/make-user'

let server: Server

describe('Edit Portifolio (E2E)', () => {
  beforeAll(async () => {
    const { app } = await import('@/app')
    server = createServer(app)
  })

  afterAll(() => {
    server.close()
  })

  test('[PUT] /portifolios/:id', async () => {
    const user = await makePrismaUser()
    const token = makeAuthentication(user.id.toString())

    const portifolio = await makePrismaPortifolio({
      userId: user.id,
    })

    const portifolioId = portifolio.id.toString()

    const response = await request(server)
      .put(`/portifolios/${portifolioId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Updated title',
        description: 'Updated description',
        link: 'https://updatedlink.com',
        thumbKey: 'https://random-thumb-key.com',
        tags: ['UI', 'Web'],
      })

    expect(response.statusCode).toBe(204)

    const prisma = getPrisma()

    const portifolioOnDatabase = await prisma.portifolio.findFirst()

    expect(portifolioOnDatabase).toEqual(
      expect.objectContaining({
        title: 'Updated title',
        description: 'Updated description',
        link: 'https://updatedlink.com',
        thumbKey: 'https://random-thumb-key.com',
        tags: ['UI', 'Web'],
      }),
    )
  })
})
