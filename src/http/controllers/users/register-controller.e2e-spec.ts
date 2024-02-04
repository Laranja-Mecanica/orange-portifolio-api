import { getPrisma } from '@/http/prisma/prisma'
import { Server, createServer } from 'http'
import request from 'supertest'

let server: Server

describe('Register (E2E)', () => {
  beforeAll(async () => {
    const { app } = await import('@/app')
    server = createServer(app)
  })

  afterAll(() => {
    server.close()
  })

  test('[POST] /register', async () => {
    const response = await request(server).post('/register').send({
      name: 'John',
      lastName: 'Doe',
      country: 'Greece',
      email: 'johndoe@example.com',
      password: 'randomPassword@123',
    })

    expect(response.statusCode).toBe(201)

    const prisma = getPrisma()

    const userOnDatabase = await prisma.user.findUnique({
      where: {
        email: 'johndoe@example.com',
      },
    })

    expect(userOnDatabase).toBeTruthy()
  })
})
