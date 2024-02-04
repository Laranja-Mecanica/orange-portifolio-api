import cors from 'cors'
import express, { NextFunction, Request, Response } from 'express'

import { editPortifolio } from './http/controllers/portifolios/edit-portifolio-controller'
import { getPortifolioById } from './http/controllers/portifolios/get-portifolio-by-id-controller'
import { fetchUserPortifolio } from './http/controllers/users/fetch-user-portifolios-controller'

import { createPortifolio } from './http/controllers/portifolios/create-portifolio-controller'
import { deletePortifolio } from './http/controllers/portifolios/delete-portifolio-controller'
import { authenticate } from './http/controllers/users/authenticate-controller'
import { getUserProfileById } from './http/controllers/users/get-user-profile-by-id-controller'
import { register } from './http/controllers/users/register-controller'
import { authorize } from './http/midllewares/authenticate'

import { env } from '@/env'
import session from 'express-session'
import passport from 'passport'
import swaggerUi from 'swagger-ui-express'

import swaggerDoc from '../docs/swagger-api-doc.json'
import { fetchRecentPortifolios } from './http/controllers/portifolios/fetch-recent-portfolios-controller'
import { options } from './http/cors/cors.config'
import './http/oauth/google-strategy'

export const app = express()

app.use(express.json())
app.use(cors(options))

const signUser = (req: Request, res: Response, next: NextFunction) => {
  if (req.user) {
    req.user
  }
}

app.post('/register', register)
app.post('/session', authenticate)

app.use(
  session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  }),
)
app.use(passport.initialize())
app.use(passport.session())

app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] }),
)

app.get('/auth/google/callback', (req: Request, res: Response) => {
  return res.json(req.user)
})

app.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDoc, {
    swaggerOptions: {
      supportedSubmitMethods: [],
    },
  }),
)

app.use(authorize)

app.get('/portifolios/:id', getPortifolioById)
app.post('/portifolios', createPortifolio)
app.put('/portifolios/:id', editPortifolio)
app.delete('/portifolios/:id', deletePortifolio)
app.get('/discover', fetchRecentPortifolios)

app.get('/users/:id', getUserProfileById)
app.get('/users/:id/portifolios', fetchUserPortifolio)
