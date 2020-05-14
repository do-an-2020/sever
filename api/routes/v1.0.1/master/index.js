import express from 'express'
import category from './category'
import city from './city'

const router = express.Router()

router.use('/category', category)

router.use('/city', city)

export default router
