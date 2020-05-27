import express from 'express'
import suppliersRouter from './suppliers'
import cmsRouter from './cms'
import vendorRoutes from './venders'
import master from './master'

const router = express.Router()
// console.log('TCL: router', router.all()

// router.use('/cms', cmsRouter)
// router.use('/supplier', suppliersRouter)
router.use('/venderapp', vendorRoutes)
router.use('/master', master)

export default router
