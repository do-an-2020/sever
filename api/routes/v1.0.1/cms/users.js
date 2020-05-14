import express from 'express'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import { UserSchema } from '../../../database/Schemas'
import table from '../../../database/tableName'
import { res422, res200 } from '../../../commons/cusResponse'
import { userTypeArr } from '../../../constant/type'
import { generateHash } from '../../../database/Schemas/User'
import { secretkey } from '../../../database/config'
import upload from '../../../commons/upload'
import { limit, first } from '../../../constant/pages'

const User = mongoose.model(table.user, UserSchema)

const usersRouter = express.Router()

usersRouter.get('', async (req, res) => {
  try {
    const { page = first } = req.query
    const { pageSize = limit } = req.query
    User.countDocuments().then(count => {
      const maxPage = Math.floor(count)
      if (page > maxPage) {
        res422(res, 'Không tìm thấy dữ liệu')
        return
      }
      const pa = {
        skip: (page - 1) * pageSize,
        limit: Number(pageSize),
      }
      User.find({ email: { $regex: req.query.keyword || '', $options: 'i' } }, null, pa)
        .populate('submiter', ['_id', 'name'])
        .then(r => {
          const data = {
            data: r,
            page: {
              current: page,
              pageSize,
              totalRows: maxPage,
            },
          }
          res200(res, data)
        })
        .catch(e => {
          res422(res, e)
        })
    })
  } catch (error) {
    res.status(500).send(error)
  }
})

usersRouter.post('/add-new', upload.none(), (req, res) => {
  const { email, password, phone, type } = req.body
  if (!userTypeArr.includes(type)) {
    res422(res)
    return
  }
  if (((email !== '' && email) || (phone !== '' && phone)) && password && password !== '') {
    // res.send({ a: 'xin chao' })
    const param = {
      password,
      email,
      phone,
      type,
      //   ...body,
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
              return
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
                data: { ...dataUser, token: `${token}` },
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

export default usersRouter
