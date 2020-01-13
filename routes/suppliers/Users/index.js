import express from 'express'
import passport from 'passport'

const usersRouter = express.Router()

usersRouter.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  console.log('TCL: req', req)
  res.send({ a: 'asdasd' })
})

usersRouter.post('/sign_up', (req, res) => {})

export default usersRouter
