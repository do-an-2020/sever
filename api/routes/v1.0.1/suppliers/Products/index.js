import express from 'express'

import AllProduct from '../../all/Product'

const productRoutes = express.Router()

productRoutes.use(AllProduct)

// productRoutes.get()

export default productRoutes
