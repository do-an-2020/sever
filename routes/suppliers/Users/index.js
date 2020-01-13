import express from 'express'
import passport from 'passport'

const usersRouter = express.Router()

usersRouter.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.send({ a: 'asdasd' })
})

export default usersRouter
