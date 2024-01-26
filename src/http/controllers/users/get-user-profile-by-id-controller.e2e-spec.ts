import { Server, createServer } from 'http'
import request from 'supertest'
import { makeAuthentication } from 'test/factories/make-authentication'
import { makePrismaUser } from 'test/factories/make-user'

let server: Server

describe('Get User Profile by Id (E2E)', () => {
  beforeAll(async () => {
    const { app } = await import('@/app')
    server = createServer(app)
  })

  afterAll(() => {
    server.close()
  })

  test('[GET] /users/:id', async () => {
    const user = await makePrismaUser()
    const token = makeAuthentication(user.id.toString())

    const userId = user.id.toString()

    const response = await request(server)
      .get(`/users/${userId}`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toBe(200)
    expect(response.body.user.name).toBe(user.name)
  })
})
