import express from 'express'
import passport from 'passport'

import { model } from 'mongoose'
import upload from '../../../../commons/upload'
import { res200, res422 } from '../../../../commons/cusResponse'
import table from '../../../../database/tableName'
import { CategorySchema, FoodSchema } from '../../../../database/Schemas'
import { runWithSession } from '../../../../database/session'
import { revertPath } from '../../../../commons/revertPath'

const router = express.Router()

const Category = model(table.category, CategorySchema)
const Food = model(table.food, FoodSchema)

router.post(
  '/create',
  upload.array('image[]', 5),
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { category, name, description, price } = req.body
    if (!category || !name || !description || price === undefined) {
      res422('Thiếu param')
      return
    }

    runWithSession(
      async (session, success) => {
        const realCategory = await Category.findById(category)

        if (!realCategory || realCategory.vendor?.toString() !== req.user.getId()?.toString()) {
          res422(res, 'Không tìm thấy category')
          return
        }

        const arrImage = req.files.map(i => revertPath(i.path))

        const param = {
          name,
          image: arrImage,
          description,
          price,
          category,
          vendor: req.user.getId(),
        }

        const dataFood = await Food.insertMany([param], { session })
        if (dataFood.length <= 0) {
          res422(res, 'Không thể lưu food')
          return
        }

        await Category.findByIdAndUpdate(
          category,
          {
            $inc: {
              total_products: 1,
            },
          },
          { session }
        )

        await success()
        res200(res, dataFood[0]?.bindJson())
      },
      null,
      err => {
        res422(res, err)
      }
    )
  }
)

export default router
