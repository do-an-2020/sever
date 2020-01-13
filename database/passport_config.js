import { Strategy, ExtractJwt } from 'passport-jwt'
import { secretkey } from './config'

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secretkey,
}

const setup = passport => {
  passport.use(
    new Strategy(options, (payload, callback) => {
      console.log('TCL: payload', payload)
      callback({ payload })
    })
  )
}

export default setup
