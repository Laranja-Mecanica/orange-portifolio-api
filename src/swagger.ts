import swaggerAutogen from 'swagger-autogen'
import { env } from './env'

const doc = {
  info: {
    version: 'v1.0.0',
    title: 'Swagger Demo Project',
    description: 'Implementation of Swagger with TypeScript',
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

const outputFile = './swagger_output.json'
const endpointsFiles = ['./src/app.ts']

swaggerAutogen(outputFile, endpointsFiles, doc)
