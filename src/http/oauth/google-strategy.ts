import { env } from '@/env'
import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { getPrisma } from '../prisma/prisma'

const prisma = getPrisma()

passport.use(
  new GoogleStrategy(
    {
      clientID: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'https://google.com',
    },
    (access_token, refresh_token, profile, done) => {
      const user = prisma.user.findFirst({
        where: {
          googleId: profile.id,
        },
      })

      if (!user) {
        const newUser = prisma.user.create({
          data: {
            name: profile.name?.givenName ? profile.name?.givenName : '',
            lastName: profile.name?.familyName ? profile.name?.familyName : '',
            email: profile.emails ? profile.emails[0].value : '',
            googleId: profile.id,
          },
        })

        if (newUser) {
          done(null, newUser)
        }
      } else {
        done(null, user)
      }
    },
  ),
)