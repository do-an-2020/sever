import express from 'express'
import suppliersRouter from './suppliers'

const router = express.Router()
// console.log('TCL: router', router.all()

router.use('/supplier', suppliersRouter)

export default router
