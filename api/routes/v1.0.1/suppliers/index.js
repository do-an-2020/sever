import express from 'express'
import usersRouter from './Users'
import categoryRouter from './Categories'
import authRouters from '../all/auth/auth'
import productRoutes from './Products'
import router from './Supplier'

const suppliersRouter = express.Router()

suppliersRouter.use('', authRouters)
suppliersRouter.use('', router)
suppliersRouter.use('/product', productRoutes)
suppliersRouter.use('/user', usersRouter)
suppliersRouter.use('/category', categoryRouter)

export default suppliersRouter
