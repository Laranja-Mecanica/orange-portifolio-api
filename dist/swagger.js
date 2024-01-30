'use strict'
const __create = Object.create
const __defProp = Object.defineProperty
const __getOwnPropDesc = Object.getOwnPropertyDescriptor
const __getOwnPropNames = Object.getOwnPropertyNames
const __getProtoOf = Object.getPrototypeOf
const __hasOwnProp = Object.prototype.hasOwnProperty
const __copyProps = (to, from, except, desc) => {
  if ((from && typeof from === 'object') || typeof from === 'function') {
    for (const key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, {
          get: () => from[key],
          enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable,
        })
  }
  return to
}
const __toESM = (mod, isNodeMode, target) => (
  (target = mod != null ? __create(__getProtoOf(mod)) : {}),
  __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule
      ? __defProp(target, 'default', { value: mod, enumerable: true })
      : target,
    mod,
  )
)

// src/swagger.ts
const import_swagger_autogen = __toESM(require('swagger-autogen'))

// src/env/index.ts
const import_config = require('dotenv/config')
const import_zod = require('zod')
const envSchema = import_zod.z.object({
  NODE_ENV: import_zod.z.enum(['dev', 'test', 'production']).default('dev'),
  PORT: import_zod.z.coerce.number().default(3333),
  DATABASE_URL: import_zod.z.string(),
  JWT_PVK: import_zod.z.string(),
})
const _env = envSchema.safeParse(process.env)
if (_env.success === false) {
  console.log('\u274C Invalid environment variables', _env.error.format())
  throw new Error('Invalid environment variables.')
}
const env = _env.data

// src/swagger.ts
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
;(0, import_swagger_autogen.default)(outputFile, endpointsFiles, doc)
