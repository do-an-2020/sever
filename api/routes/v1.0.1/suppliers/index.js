import express from 'express'
import usersRouter from './Users'
import categoryRouter from './Categories'

const suppliersRouter = express.Router()

suppliersRouter.use('/user', usersRouter)
suppliersRouter.use('/category', categoryRouter)

export default suppliersRouter
