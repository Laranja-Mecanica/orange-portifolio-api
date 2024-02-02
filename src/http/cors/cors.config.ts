import { CorsOptions } from 'cors'

const allowedOrigins = [
  'http://localhost:3000',
  'https://orange-portifolio.vercel.app',
]

export const options: CorsOptions = {
  origin: allowedOrigins,
}
