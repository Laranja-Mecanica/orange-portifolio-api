import { Server, createServer } from 'http'
import request from 'supertest'
import { makeAuthentication } from 'test/factories/make-authentication'
import { makePrismaPortifolio } from 'test/factories/make-portifolio'
import { makePrismaUser } from 'test/factories/make-user'

let server: Server

describe('Get Portifolio by Id (E2E)', () => {
  beforeAll(async () => {
    const { app } = await import('@/app')
    server = createServer(app)
  })

  afterAll(() => {
    server.close()
  })

  test('[GET] /portifolios/:id', async () => {
    const user = await makePrismaUser()
    const token = makeAuthentication(user.id.toString())

    const portifolio = await makePrismaPortifolio({
      userId: user.id,
      title: 'Nice project!',
      tags: ['Web', 'Mobile'],
    })

    const portifolioId = portifolio.id.toString()

    const response = await request(server)
      .get(`/portifolios/${portifolioId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({})

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      portifolio: expect.objectContaining({
        title: 'Nice project!',
        tags: ['Web', 'Mobile'],
        userName: user.name,
      }),
    })
  })
})
