import express from 'express'
import v101 from './v1.0.1'

const router = express.Router()

router.use('/v101', v101)

console.log('TCL: v101', v101)

export default router
