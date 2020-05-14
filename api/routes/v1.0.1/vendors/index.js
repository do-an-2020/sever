import express from 'express'
import vendor from './vendor'

const router = express.Router()

router.use('', vendor)

export default router
