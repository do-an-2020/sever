import express from 'express'
import create from './create'
import auth from './auth'

const router = express.Router()

router.use('', create)
router.use('', auth)

export default router
