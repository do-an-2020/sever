import express from 'express'
import usersRouter from './Users'

const suppliersRouter = express.Router()

suppliersRouter.use('/user', usersRouter)

export default suppliersRouter
