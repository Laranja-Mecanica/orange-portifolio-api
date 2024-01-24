import express from 'express'
import { register } from './http/controllers/register'

export const app = express()

app.use(express.json())
app.post('/register', register)
