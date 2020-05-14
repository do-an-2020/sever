import express from 'express'
import { model } from 'mongoose'
import upload from '../../../commons/upload'
import { res200, res422 } from '../../../commons/cusResponse'
import table from '../../../database/tableName'
import { LocationSchema } from '../../../database/Schemas'

const router = express.Router()

const Location = model(table.location, LocationSchema)
router // tạo nên data default cho cy
  .post('/create', upload.none(), (req, res) => {
    const { name, display_name, lat, long } = req.body

    if (!name || !display_name || !lat || !long) {
      res422(res, 'Missing parameter')
      return
    }

    const data = { name, display_name, lat, long, type: 'location' }

    const newData = new Location(data)

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
