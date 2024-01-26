import express from 'express'

import { createPortifolio } from './http/controllers/portifolios/create-portifolio'
import { deletePortifolio } from './http/controllers/portifolios/delete-portifolio'
import { authenticate } from './http/controllers/users/authenticate'
import { register } from './http/controllers/users/register'

export const app = express()

app.use(express.json())

app.post('/register', register)
app.post('/session', authenticate)

app.post('/portifolios', createPortifolio)
app.delete('/portifolios/:id', deletePortifolio)
