import { getPrisma } from '@/http/prisma/prisma'
import { Server, createServer } from 'http'
import request from 'supertest'
import { makeAuthentication } from 'test/factories/make-authentication'
import { makePrismaUser } from 'test/factories/make-user'

let server: Server

describe('Create Portifolio (E2E)', () => {
  beforeAll(async () => {
    const { app } = await import('@/app')
    server = createServer(app)
  })

  afterAll(() => {
    server.close()
  })

  test('[POST] /portifolios', async () => {
    const user = await makePrismaUser()
    const token = makeAuthentication(user.id.toString())

    const response = await request(server)
      .post('/portifolios')
      .send({
        userId: user.id.toString(),
        title: 'My last project',
        description: 'This project was developed with TS and React.',
        link: 'https://example.com',
      })
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toBe(201)

    const prisma = getPrisma()

    const portifolioOnDatabase = await prisma.portifolio.findFirst()

    expect(portifolioOnDatabase).toBeTruthy()
  })
})
