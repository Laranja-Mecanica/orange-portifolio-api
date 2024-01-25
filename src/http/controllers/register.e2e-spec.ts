import { Server, createServer } from 'http'
import request from 'supertest'
import { getPrisma } from '../prisma/prisma'

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
      email: 'johndoe@example.com',
      password: '123456',
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
