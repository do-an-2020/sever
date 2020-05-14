import express from 'express'
import authRouters from '../all/auth/auth'
import productRoutes from './Products'

const suppliersRouter = express.Router()

suppliersRouter.use('', authRouters)
suppliersRouter.use('/product', productRoutes)

export default suppliersRouter
