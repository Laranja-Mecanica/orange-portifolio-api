import cors from 'cors'
import express from 'express'

import { editPortifolio } from './http/controllers/portifolios/edit-portifolio-controller'
import { getPortifolioById } from './http/controllers/portifolios/get-portifolio-by-id-controller'
import { fetchUserPortifolio } from './http/controllers/users/fetch-user-portifolios-controller'

import { createPortifolio } from './http/controllers/portifolios/create-portifolio-controller'
import { deletePortifolio } from './http/controllers/portifolios/delete-portifolio-controller'
import { authenticate } from './http/controllers/users/authenticate-controller'
import { getUserProfileById } from './http/controllers/users/get-user-profile-by-id-controller'
import { register } from './http/controllers/users/register-controller'
import { options } from './http/cors/cors.config'

import passport from 'passport'
import swaggerUi from 'swagger-ui-express'
import { authorize } from './http/midllewares/authenticate'
import './http/oauth/google-strategy'
import swaggerOutput from './swagger_output.json'

export const app = express()

app.use(express.json())
app.use(cors(options))

app.post('/register', register)
app.post('/session', authenticate)

app.use(passport.initialize())

app.get(
  '/google/auth',
  passport.authenticate('google', {
    scope: ['profile'],
    successRedirect: '/register',
    failureRedirect: '/session',
  }),
)

app.use(authorize)

app.get('/portifolios/:id', getPortifolioById)
app.post('/portifolios', createPortifolio)
app.put('/portifolios/:id', editPortifolio)
app.delete('/portifolios/:id', deletePortifolio)

app.get('/users/:id', getUserProfileById)
app.get('/users/:id/portifolios', fetchUserPortifolio)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput))
