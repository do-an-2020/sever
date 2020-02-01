import express from 'express'

import AllProduct from '../../all/Product'

const productRoutes = express.Router()

productRoutes.use(AllProduct)

export default productRoutes
