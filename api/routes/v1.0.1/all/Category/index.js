import express from 'express'
import mongoose from 'mongoose'
import passport from 'passport'
import upload from '../../../../commons/upload'

import SchCate from '../../../../database/Schemas/Category'
import table from '../../../../database/tableName'
import { res422, res200 } from '../../../../commons/cusResponse'
import { revertPath } from '../../../../commons/revertPath'
import { limit, first } from '../../../../constant/pages'

const CateModel = mongoose.model(table.category, SchCate)

const categoryRouter = express.Router()

categoryRouter.get('', (req, res) => {
  const { page = first } = req.query
  CateModel.countDocuments({ status: 1 })
    .then(count => {
      const maxPage = Math.floor(count / limit) + 1
      if (page > maxPage) {
        res422(res, 'không tìm thấy dữ liệu')
        return
      }
      CateModel.find({ status: 1 }, null, { skip: (page - 1) * limit, limit })
        .populate('submiter', ['_id', 'name'])
        .then(r => {
          const data = {
            data: r,
            page: {
              current: page,
              limit,
              total: maxPage,
              nextPage: page < maxPage ? page + 1 : null,
            },
          }
          res200(res, data)
        })
        .catch(e => {
          res422(res, e)
        })
    })
    .catch(e => {
      res422(res, e)
    })
})

categoryRouter.get('/:id', (req, res) => {
  const { id } = req.params
  CateModel.findById(id)
    .populate('submiter', ['_id', 'name'])
    .then(cate => {
      res200(res, {
        data: cate.bindJson(),
      })
    })
    .catch(e => {
      res422(res, e)
    })
})

/** thêm mới category */
categoryRouter.post(
  '',
  upload.single('image'),
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // lấy thông tin từ body
    const { name, description } = req.body
    const { path } = req.file
    const { _id } = req.user

    // tạo object mới
    const handleCate = {
      name,
      description,
      image: revertPath(path),
      submiter: _id,
    }

    // tạo 1 bản ghi trong database
    const newCategory = new CateModel(handleCate)
    newCategory.save((err, cate) => {
      if (err) {
        res422(res, err)
      } else {
        const dataCate = cate.bindJson()
        res200(res, dataCate)
      }
    })
  }
)

// categoryRouter.put('', upload.single('a'), (req, res) => {})

export default categoryRouter
