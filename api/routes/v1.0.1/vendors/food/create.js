import express from 'express'
import passport from 'passport'

import upload from '../../../../commons/upload'
import { res200 } from '../../../../commons/cusResponse'

const router = express.Router()

router.post(
  '/create',
  upload.array('image[]', 5),
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    console.log('req', req)
    res200(res, '')
  }
)

export default router
