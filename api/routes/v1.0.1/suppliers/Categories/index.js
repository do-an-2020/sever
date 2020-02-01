import express from 'express'
import categoryAll from '../../all/Category'

const categoryRouter = express.Router()

// categoryRouter.get('', (req, res) => {
//   console.log('TCL: req', req)
// })
categoryRouter.use(categoryAll)

export default categoryRouter
