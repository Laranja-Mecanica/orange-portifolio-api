import express from 'express'

import { createPortifolio } from './http/controllers/portifolios/create-portifolio'
import { deletePortifolio } from './http/controllers/portifolios/delete-portifolio'
import { editPortifolio } from './http/controllers/portifolios/edit-portifolio-controller'
import { getPortifolioById } from './http/controllers/portifolios/get-portifolio-by-id-controller'
import { authenticate } from './http/controllers/users/authenticate'
import { fetchUserPortifolio } from './http/controllers/users/fetch-user-portifolios-controller'
import { getUserProfileById } from './http/controllers/users/get-user-profile-by-id'
import { register } from './http/controllers/users/register'
import { authorize } from './http/midllewares/authenticate'

export const app = express()

app.use(express.json())

app.post('/register', register)
app.post('/session', authenticate)

app.use(authorize)

app.get('/portifolios/:id', getPortifolioById)
app.post('/portifolios', createPortifolio)
app.put('/portifolios/:id', editPortifolio)
app.delete('/portifolios/:id', deletePortifolio)

app.get('/users/:id', getUserProfileById)
app.get('/users/:id/portifolios', fetchUserPortifolio)
