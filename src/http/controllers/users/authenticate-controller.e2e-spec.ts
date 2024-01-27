import { getPrisma } from '@/http/prisma/prisma'
import { hash } from 'bcrypt'
import { Server, createServer } from 'http'
import request from 'supertest'

let server: Server

describe('Authenticate (E2E)', () => {
  beforeAll(async () => {
    const { app } = await import('@/app')
    server = createServer(app)
  })

  afterAll(() => {
    server.close()
  })

  test('[POST] /session', async () => {
    const prisma = getPrisma()

    await prisma.user.create({
      data: {
        name: 'John',
        lastName: 'Doe',
        email: 'johndoe@example.com',
        password: await hash('123456', 10),
      },
    })

    const response = await request(server).post('/session').send({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(response.statusCode).toBe(200)
  })
})
