import { CorsOptions } from 'cors'

const allowedOrigins = ['http://localhost:3000', 'http://0.0.0.0:3000']

export const options: CorsOptions = {
  origin: allowedOrigins,
}
