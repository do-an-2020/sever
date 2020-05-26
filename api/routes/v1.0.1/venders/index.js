import express from 'express'
import vender from './vender'
import category from './category'
import food from './food'
import chat from './chat'

const router = express.Router()

router.use('/category', category)
router.use('', vender)
router.use('/food', food)
router.use('/chat', chat)

export default router
