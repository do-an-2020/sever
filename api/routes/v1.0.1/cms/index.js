import express from 'express'
import customerRouter from './customer'
import usersRouter from './users'

const router = express.Router()

router.use('/customer', customerRouter)

router.use('/users', usersRouter)

export default router
