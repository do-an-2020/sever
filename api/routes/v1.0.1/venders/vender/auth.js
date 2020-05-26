import express from 'express'
import { model } from 'mongoose'
import jwt from 'jsonwebtoken'
import passport from 'passport'

import upload from '../../../../commons/upload'
import { res422, res200 } from '../../../../commons/cusResponse'
import table from '../../../../database/tableName'
import { UserSchema, VendorSchema } from '../../../../database/Schemas'
import { secretkey } from '../../../../database/config'

const User = model(table.user, UserSchema)
const Vendor = model(table.vendor, VendorSchema)

const router = express.Router()

router.post('/sign_in', upload.none(), async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    res422(res, ' Thiếu param')
    return
  }
  try {
    const user = await User.findOne({ email })
    const dataUser = user.bindJson()

    if (!dataUser) {
      res422(res, 'Không tìm thấy account')
      return
    }

    const checkLogion = await user.comparePasswordPromise(password)

    if (!checkLogion) {
      res422(res, 'Tài khoản hoặc mật khẩu không chính xác')
      return
    }

    const token = jwt.sign(dataUser, secretkey)

    res200(res, { token })
  } catch (error) {
    res422(res, error)
  }
})

router.get('/me', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { vendor } = req.user

  try {
    const data = await Vendor.findById(vendor)
      .populate('base')
      .populate('category')
      .populate('city')

    res200(res, {
      ...data.bindJson(),
      base: data.getBase().map(i => i.bindJson()),
      category: data.getCategory().bindJson(),
      city: data.getCity().bindJson(),
    })
  } catch (error) {
    res422(res, error)
  }
})

router.get('/me/account', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    res200(res, {
      ...req.user.bindJson(),
    })
  } catch (error) {
    res422(res, error)
  }
})

export default router
