import { env } from '@/env'
import { Application } from 'express'
import http, { Server as HTTPServer } from 'http'
import request from 'supertest'
import { getPrisma } from '../prisma/prisma'

let server: HTTPServer

describe('Register (E2E)', () => {
  let app: Application

  beforeAll(async () => {
    const { app: expressApp } = await import('@/app')
    app = expressApp

    server = http.createServer(app)
    server.listen(env.PORT)
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
