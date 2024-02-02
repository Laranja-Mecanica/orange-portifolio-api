import { CorsOptions } from 'cors'

const allowedOrigins = [
  'http://localhost:3000',
  'https://orange-app-2m9ib.ondigitalocean.app',
  '',
]

export const options: CorsOptions = {
  origin: allowedOrigins,
  credentials: true,
}
