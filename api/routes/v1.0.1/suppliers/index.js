import express from 'express'
import usersRouter from './Users'
import categoryRouter from './Categories'
import authRouters from '../all/auth/auth'

const suppliersRouter = express.Router()

suppliersRouter.use('', authRouters)
suppliersRouter.use('/user', usersRouter)
suppliersRouter.use('/category', categoryRouter)

export default suppliersRouter
