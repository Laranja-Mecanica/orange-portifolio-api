import { Server, createServer } from 'http'
import request from 'supertest'
import { makeAuthentication } from 'test/factories/make-authentication'
import { makePrismaPortifolio } from 'test/factories/make-portifolio'
import { makePrismaUser } from 'test/factories/make-user'

let server: Server

describe('Fetch User Portifolio (E2E)', () => {
  beforeAll(async () => {
    const { app } = await import('@/app')
    server = createServer(app)
  })

  afterAll(() => {
    server.close()
  })

  test('[GET] /users/:id/portifolios', async () => {
    const user = await makePrismaUser()
    const user2 = await makePrismaUser()

    await Promise.all([
      makePrismaPortifolio({ userId: user.id }),
      makePrismaPortifolio({ userId: user.id }),
      makePrismaPortifolio({ userId: user2.id }),
    ])

    const userId = user.id.toString()

    const token = makeAuthentication(userId)

    const response = await request(server)
      .get(`/users/${userId}/portifolios`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toBe(200)
    expect(response.body.portifolios).toHaveLength(2)
  })
})
