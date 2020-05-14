import express from 'express'
import create from './create'

const router = express.Router()

router.use('', create)

export default router
