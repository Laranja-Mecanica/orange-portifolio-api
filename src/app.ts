import cors from 'cors'
import express, { Request, Response } from 'express'

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
import { options } from './http/cors/cors.config'
import './http/oauth/google-strategy'

export const app = express()

app.use(express.json())
app.use(cors(options))

app.post('/register', register)
app.post('/session', authenticate)

app.use(
  session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  }),
)

app.use(passport.initialize())
app.use(passport.session())

// app.get(
//   '/oauth2/google',
//   passport.authenticate('google', { scope: ['email', 'profile'] }),
// )

app.get(
  '/oauth2/redirect/google',
  passport.authenticate('google', {
    scope: ['email', 'profile'],
    failureRedirect: 'https://orange-portifolio.vercel.app/',
    successRedirect: '/',
  }),
)

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

app.get('/', (req: Request, res: Response) => {
  console.log('passou')
})

app.get('/portifolios/:id', getPortifolioById)
app.post('/portifolios', createPortifolio)
app.put('/portifolios/:id', editPortifolio)
app.delete('/portifolios/:id', deletePortifolio)

app.get('/users/:id', getUserProfileById)
app.get('/users/:id/portifolios', fetchUserPortifolio)
