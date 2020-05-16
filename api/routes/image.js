import express from 'express'
import fs from 'fs'
import { converPath } from '../commons/revertPath'

const router = express.Router()

router.get('/images/:d/:name', (req, res) => {
  const { name, d } = req.params
  const path = converPath(`/images/${d}/${name}`)
  fs.readFile(path, (e, data) => {
    res.end(data)
  })
})

export default router
