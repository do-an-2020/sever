import express from 'express'
import passport from 'passport'

const usersRouter = express.Router()

usersRouter.get(
  '/me',
  passport.authenticate('jwt', { session: false, failWithError: true }),
  (err, req, res, next) => {
    console.log('TCL: req', err)
    if (err) next(err)

    res.send({ a: 'asdasd' })
  }
)

usersRouter.put('/me', () => {})

usersRouter.post('/sign_up', (req, res) => {})

export default usersRouter
