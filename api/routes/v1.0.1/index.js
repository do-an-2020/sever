import express from 'express'
import suppliersRouter from './suppliers'
import cmsRouter from './cms'

const router = express.Router()

router.use('/cms', cmsRouter)
router.use('/supplier', suppliersRouter)

export default router
