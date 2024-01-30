import swaggerAutogen from 'swagger-autogen'
import { env } from '../src/env'

const doc = {
  info: {
    version: 'v1.0.0',
    title: 'Orange Portfólio API',
    description: 'A API mais vitaminada do mundo!',
  },
  servers: [
    {
      url: `http://localhost:${env.PORT}`,
      description: '',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
      },
    },
  },
}

const outputFile = '../docs/swagger_output.json'
const endpointsFiles = ['./src/app.ts']

swaggerAutogen(outputFile, endpointsFiles, doc)
