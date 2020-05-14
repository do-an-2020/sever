import express from 'express'
import mongoose from 'mongoose'
import passport from 'passport'
import upload from '../../../../commons/upload'
import { res200, res422 } from '../../../../commons/cusResponse'

import CateSch from '../../../../database/Schemas/Category'
import ProSch from '../../../../database/Schemas/Product'
import table from '../../../../database/tableName'
import { revertPath } from '../../../../commons/revertPath'

const Category = mongoose.model(table.category, CateSch)
const Product = mongoose.model(table.product, ProSch)
mongoose.set('useFindAndModify', false)

const productRoutes = express.Router()

productRoutes.post(
  '',
  upload.array('images', 10),
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { type = '' } = req.user
    if (!type.match(/admin|supplier/)) {
      res422(res, 'Không có đủ quyền')
      return
    }
    const { category } = req.body
    if (!category) {
      res422(res, 'Thiếu thông tin')
      return
    }

    const supplier = type === 'admin' ? req.body.supplier : req.user.supplier

    if (!supplier) {
      res422(res, 'Thiếu thông tin')
      return
    }

    Category.findById(category)
      .then(r => {
        if (r && r.status === 1) {
          const images = Array.isArray(req.files)
            ? req.files.reduce((a, b) => {
                return [...a, revertPath(b.path)]
              }, [])
            : []
          const { name, description, short_description, price } = req.body
          if (!name || !price) {
            res422(res, 'Thiếu thông tin')
            return
          }
          const handlePro = {
            name,
            description,
            short_description,
            price,
            images,
            category,
            supplier,
          }
          const newProduct = new Product(handlePro)
          newProduct
            .populate('category', ['_id', 'name'])
            .save()
            .then(pro => {
              Category.findByIdAndUpdate(
                category,
                {
                  $inc: { total_products: 1 },
                },
                { new: true }
              ).then(e => {
                console.log('TCL: e', e)
              })
              pro
                .populate('category', ['_id', 'name'])
                .populate('supplier', ['_id', 'name'])
                .execPopulate(() => {
                  res200(res, { data: pro })
                })
            })
        } else {
          res422(res, 'Không tìm thấy category')
        }
      })
      .catch(e => {
        console.log('e', e)
        res422(res, 'Không tìm thấy category')
      })
  }
)

export default productRoutes
