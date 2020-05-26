import express from 'express'
import create from './create'
import list from './list'

const router = express.Router()

router.use('', create)
router.use('', list)

export default router
