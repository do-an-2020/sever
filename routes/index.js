import express from 'express'
import suppliersRouter from './suppliers'

const router = express.Router()

router.use('/suppliers', suppliersRouter)

export default router
