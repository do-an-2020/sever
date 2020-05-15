import express from 'express'
import passport from 'passport'
import mongoose from 'mongoose'
import upload from '../../../../commons/upload'
import { res200, res422 } from '../../../../commons/cusResponse'
import table from '../../../../database/tableName'
import SupplierSchema from '../../../../database/Schemas/Supplier'
import userSchema from '../../../../database/Schemas/User'
import { revertPath } from '../../../../commons/revertPath'

const SupplierRouter = express.Router()

const Supplier = mongoose.model(table.supplier, SupplierSchema)
const User = mongoose.model(table.user, userSchema)
SupplierRouter.get('', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { supplier } = req.user
  Supplier.findById(supplier)
    .then(r => {
      res200(res, { ...r._doc, user: req.user.bindJson() })
    })
    .catch(() => {
      res422(res, 'Đã xảy ra lỗi')
    })
})

// user tạo nhà cung cấp
SupplierRouter.post(
  '',
  upload.single('image'),
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { supplier, type } = req.user
    if (type !== 'supplier') {
      res422(res, 'Không có quyền truy cập')
      return
    }
    if (supplier) {
      res422(res, 'Tài khoản này đã liên kết với nhà cung cấp')
      return
    }
    const { name, description, address, lat, long, category } = req.body
    if (!name || !address || !category) {
      res422(res, 'Thiếu thông tin')
      return
    }
    const { path } = req.file

    const handle = {
      name,
      description,
      address,
      lat,
      long,
      image: revertPath(path),
      category,
    }

    const newSup = new Supplier(handle)

    mongoose.createConnection()

    newSup
      .save()
      .then(sup => {
        const { _id } = req.user
        User.findByIdAndUpdate(_id, {
          $set: {
            supplier: sup._id,
          },
        }).then(user => {
          sup.user = user
          res200(res, sup)
        })
      })
      .catch(() => {
        res422(res, '')
      })
  }
)

export default SupplierRouter
