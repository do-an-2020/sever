import express from 'express'
import { model } from 'mongoose'
import jwt from 'jsonwebtoken'
import upload from '../../../../commons/upload'
import { res422, res200 } from '../../../../commons/cusResponse'
import table from '../../../../database/tableName'
import { UserSchema } from '../../../../database/Schemas'
import { secretkey } from '../../../../database/config'

const User = model(table.user, UserSchema)

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

export default router
