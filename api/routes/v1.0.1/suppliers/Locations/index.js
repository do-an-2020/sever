import express from 'express'
import upload from '../../../../commons/upload'

const locationRouter = express.Router()

locationRouter.post('', upload.array('image[]'), (req, res) => {
  console.log('req', req.body.b)

  console.log(req.files)

  res.json({
    status: 200,
  })
})

export default locationRouter
