import express from 'express'
import { authenticate } from './http/controllers/authenticate'
import { createPortifolio } from './http/controllers/create-portifolio'
import { deletePortifolio } from './http/controllers/delete-portifolio'
import { register } from './http/controllers/register'

export const app = express()

app.use(express.json())

app.post('/register', register)
app.post('/session', authenticate)

app.post('/portifolios', createPortifolio)
app.delete('/portifolios/:id', deletePortifolio)
