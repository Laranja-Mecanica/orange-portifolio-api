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

import cookieParser from 'cookie-parser'
import swaggerDoc from '../docs/swagger-api-doc.json'
import { fetchRecentPortifolios } from './http/controllers/portifolios/fetch-recent-portfolios-controller'
import { options } from './http/cors/cors.config'
import './http/oauth/google-strategy'

export const app = express()

app.use(express.json())
app.use(cors(options))
app.use(cookieParser())

app.post('/register', register)
app.post('/session', authenticate)

app.use(
  session({
    secret: env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  }),
)
app.use(passport.initialize())
app.use(passport.session())

app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] }),
)

app.get(
  '/auth/google/callback',
  passport.authenticate('google'),
  (req: Request, res: Response) => {
    res.cookie('BANANA', req.user)
    res.redirect(`https://orange-portifolio.vercel.app?token=${req.user}`)
  },
)

// app.get(
//   '/auth/google/callback',
//   passport.authenticate('google', { failureRedirect: '/login' }),
//   (req, res) => {
//     if (req.user) {
//       const token = req.user

//       res.cookie('auth_token', token, {
//         httpOnly: true,
//         secure: true,
//         sameSite: 'none',
//         maxAge: 24 * 60 * 60 * 1000,
//       })

//       res.redirect(`https://orange-portifolio.vercel.app/home`)
//     } else {
//       res.redirect('https://orange-portifolio.vercel.app/')
//     }
//   },
// )

app.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDoc, {
    swaggerOptions: {
      supportedSubmitMethods: [],
    },
  }),
)

app.use('/getInfo', (req: Request, res: Response) => {
  return res.status(200).json({ token: req.user })
})

app.use(authorize)

app.get('/portifolios/:id', getPortifolioById)
app.post('/portifolios', createPortifolio)
app.put('/portifolios/:id', editPortifolio)
app.delete('/portifolios/:id', deletePortifolio)
app.get('/discover', fetchRecentPortifolios)

app.get('/users/:id', getUserProfileById)
app.get('/users/:id/portifolios', fetchUserPortifolio)
