import express from 'express'
import upload from '../../../../commons/upload'

const categoryRouter = express.Router()

categoryRouter.get('', (req, res) => {})

categoryRouter.post('', upload.single('p'), (req, res) => {
  console.log('TCL: req aasd', req.body)
  //   const {} = req.body
  res.status(200)
  //   res.json({ path: req.file.path })
  res.json('asd')
})

categoryRouter.put('', upload.single('a'), (req, res) => {})

export default categoryRouter
