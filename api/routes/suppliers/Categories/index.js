import express from 'express'
import categoryAll from '../../all/Category'

const categoryRouter = express.Router()

categoryRouter.use(categoryAll)

// categoryRouter.get('', (req, res) => {
//   console.log('TCL: req', req)
// })

export default categoryRouter
