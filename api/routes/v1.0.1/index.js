import express from 'express'
import suppliersRouter from './suppliers'

const router = express.Router()

router.use('/supplier', suppliersRouter)

export default router
