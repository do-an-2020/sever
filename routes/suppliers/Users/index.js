/* eslint-disable no-underscore-dangle */
import express from 'express'
import passport from 'passport'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import table from '../../../database/tableName'
import { UserSchema } from '../../../database/Schemas'
import { secretkey } from '../../../database/config'
import { generateHash } from '../../../database/Schemas/User'

const User = mongoose.model(table.user, UserSchema)

const usersRouter = express.Router()

usersRouter.get('/me', passport.authenticate('jwt', { session: false }), (req, res) => {
  User.findById(req.user._id)
    .then(r => {
      if (r) {
        const dataUser = r.bindJson()
        res.json({
          success: true,
          message: '',
          data: { ...dataUser },
        })
      } else {
        res.status(403)
        res.json({
          success: false,
          message: 'user not found',
        })
      }
    })
    .catch(() => {
      res.status(403)
      res.json({
        success: false,
        message: 'user not found',
      })
    })
})

usersRouter.put('/me', () => {})

usersRouter.post('/sign_up', (req, res) => {
  const { email, password, phone, ...body } = req.body
  if (((email !== '' && email) || (phone !== '' && phone)) && password && password !== '') {
    // res.send({ a: 'xin chao' })
    const param = {
      password,
      email,
      phone,
      ...body,
    }

    const que = {}
    if (email) {
      que.email = email
    }
    if (phone) {
      que.phone = phone
    }

    User.findOne(que)
      .then(r => {
        if (!r) {
          generateHash(param, (error, hashUser) => {
            if (error) {
              res.status(403)
              res.json({
                success: false,
                msg: 'sign up fail!',
              })
            }
            const newUser = new User(hashUser)
            newUser.save((err, user) => {
              if (err) {
                res.status(422)
                res.json({ success: false, msg: 'Username already exists.' })
                return
              }

              const dataUser = user.bindJson()
              const token = jwt.sign(dataUser, secretkey)
              res.json({
                success: true,
                msg: 'Successful created new user.',
                data: { ...dataUser, token: `Bearer ${token}` },
              })
            })
          })
        } else {
          res.status(422)
          res.json({ success: false, msg: 'Username already exists.' })
        }
      })
      .catch(() => {
        res.status(403)
        res.json({
          success: false,
          msg: 'sign up fail!',
        })
      })

    return
  }

  res.status(422)
  res.send({ message: 'email hoặc số điện thoại hoặc mật khẩu không đúng định dạng' })
})

usersRouter.post('/sign_in', (req, res) => {
  const { email, password, phone } = req.body
  if (((email !== '' && email) || (phone !== '' && phone)) && password && password !== '') {
    const que = {}
    if (email) {
      que.email = email
    }
    if (phone) {
      que.phone = phone
    }
    User.findOne(que)
      .then(r => {
        const dataUser = r.bindJson()
        const token = jwt.sign(dataUser, secretkey)
        res.json({
          success: true,
          msg: 'Successful created new user.',
          data: { ...dataUser, token: `Bearer ${token}` },
        })
      })
      .catch(() => {
        res.status(403)
        res.json({
          success: false,
          msg: 'sign in fail!',
        })
      })
    return
  }
  res.status(422)
  res.send({ message: 'email hoặc số điện thoại hoặc mật khẩu không đúng định dạng' })
})

// usersRouter.post('/sign')

export default usersRouter
