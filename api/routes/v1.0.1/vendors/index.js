import express from 'express'
import vendor from './vendor'
import category from './category'
import food from './food'

const router = express.Router()

router.use('/category', category)
router.use('', vendor)
router.use('/food', food)

export default router
