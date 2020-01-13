import { Strategy, ExtractJwt } from 'passport-jwt'
import { secretkey } from './config'
import UserModel from './Models/User'

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secretkey,
}

const setup = passport => {
  passport.use(
    new Strategy(options, (payload, callback) => {
      console.log('TCL: payload', payload)
      UserModel.findOne({ id: payload.id })
        .then(r => {
          if (typeof callback === 'function') callback(null, r)
        })
        .catch(e => {
          if (typeof callback === 'function') callback(e)
        })
    })
  )
}

export default setup
