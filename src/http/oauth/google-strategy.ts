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
      callbackURL:
        'https://orange-app-2m9ib.ondigitalocean.app/oauth2/redirect/google',
    },
    async (access_token, refresh_token, profile, done) => {
      const user = await prisma.user.findFirst({
        where: {
          googleId: profile.id,
        },
      })
      if (!user) {
        const newUser = await prisma.user.create({
          data: {
            name: profile.name?.givenName ? profile.name?.givenName : '',
            lastName: profile.name?.familyName ? profile.name?.familyName : '',
            email: profile.emails ? profile.emails[0].value : '',
            googleId: profile.id,
          },
        })
        console.log('AAAAAAAAAAAAAAAAAAAAAAAAAa')

        if (newUser) {
          done(null, newUser, access_token)
        }
      } else {
        done(null, user, access_token)
      }
    },
  ),
)

passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function (user, done) {
  done(null)
})
