import { jwt } from './jwt'

// eslint-disable-next-line prettier/prettier
export { }

declare global {
  namespace Express {
    export interface Request {
      payload?: jwt
      isSignIn: boolean
    }
  }
}
