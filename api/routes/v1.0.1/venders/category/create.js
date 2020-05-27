import express from 'express'
import passport from 'passport'
import { startSession, model } from 'mongoose'
import upload from '../../../../commons/upload'
import { res200, res422 } from '../../../../commons/cusResponse'
import table from '../../../../database/tableName'
import { CategorySchema } from '../../../../database/Schemas'

const router = express.Router()

const Category = model(table.category, CategorySchema)

router.post(
  '/create',
  upload.none(),
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { type } = req.user
    if (type !== 'vendor') {
      res422(res, 'Không có quyền truy cập')
      return
    }

    const { name, description } = req.body

    if (!name || !description) {
      res422(res, 'Thiếu param')
      return
    }

    let session

    try {
      // khoi tai transaction
      session = await startSession({
        defaultTransactionOptions: {
          writeConcern: { w: 'majority' },
          readConcern: { level: 'snapshot' },
        },
      })

      await session.startTransaction({
        writeConcern: { w: 'majority' },
        readConcern: { level: 'snapshot' },
      })

      const newCategory = await Category.insertMany([
        { name, description, vendor: req.user.getId() },
      ])

      if (newCategory.length <= 0) {
        res422(res, 'Không thể thêm dữ liệu')
        return
      }

      res200(res, newCategory[0].bindJson())
    } catch (error) {
      await session.abortTransaction()
      res422(res, error)
    } finally {
      // ket thuc tat ca se ket thuc session
      if (session) session.endSession()
    }
  }
)

export default router
