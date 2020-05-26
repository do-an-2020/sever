import express from 'express'
import passport from 'passport'
import { model } from 'mongoose'
import { res422, res200 } from '../../../../commons/cusResponse'
import table from '../../../../database/tableName'
import { CategorySchema } from '../../../../database/Schemas'
import { first, limit } from '../../../../constant/pages'

const Category = model(table.category, CategorySchema)

const router = express.Router()

router.get('', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { type } = req.user
  if (type !== 'vendor') {
    res422(res, 'Không có quyền truy cập')
    return
  }

  const { page = first } = req.query

  try {
    const count = await Category.countDocuments({ status: 1, vendor: req.user.getId() })
    const maxPage = Math.floor(count / limit) + 1
    // if (page > maxPage) {
    //   res422(res, 'không tìm thấy dữ liệu')
    //   return
    // }

    const data = await Category.find({ status: 1, vendor: req.user.getId() }, null, {
      skip: (page - 1) * limit,
      limit,
    })

    const formatData = data.map(e => {
      return e.bindJson()
    })

    res200(res, formatData, {
      current: Number(page),
      limit,
      total: maxPage,
      nextPage: page < maxPage ? page + 1 : null,
    })
  } catch (error) {
    422(res, error)
  }
})

export default router
