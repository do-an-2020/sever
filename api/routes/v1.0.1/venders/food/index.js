import express from 'express'

import list from './list'
import create from './create'
import detail from './detail'
import edit from './edit'
import del from './delete'

const router = express.Router()

router.use('', list)

router.use('', create)

router.use('', detail)

router.use('', edit)

router.use('', del)

export default router
