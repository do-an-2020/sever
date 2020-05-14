import express from 'express'
import { model } from 'mongoose'
import upload from '../../../commons/upload'
import { res422, res200 } from '../../../commons/cusResponse'
import table from '../../../database/tableName'
import { CategorySchema } from '../../../database/Schemas'
import { revertPath } from '../../../commons/revertPath'

const Category = model(table.category, CategorySchema)

const router = express.Router()

// tạo nên data default cho category
router.post('/create', upload.single('image'), (req, res) => {
  const { name, description } = req.body

  if (!name || !description || !req.file) {
    res422(res, 'Thiếu param')
    return
  }

  const data = { name, description, image: revertPath(req.file.path) }

  const newData = new Category(data)

  newData
    .save()
    .then(r => {
      res200(res, r._doc)
    })
    .catch(e => {
      res422(res, e)
    })
})

export default router
