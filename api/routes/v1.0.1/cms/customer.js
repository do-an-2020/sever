import express from 'express'
import { res200 } from '../../../commons/cusResponse'

const router = express.Router()

// func dung de lay ra thong tin tu database
router.get('', (req, res) => {
  // su dung mongosoo de lay ra thong tin can thiet
  res200(res, 'Da lay dc thong tin')
})

export default router
