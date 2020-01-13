import mongoose from 'mongoose'
import { databaseName } from './config'

mongoose.Promise = global.Promise

const options = {
  db: {
    native_parser: true,
  },
  server: {
    poolSize: 5,
  },
  // user: 'admin',
  // pass: 'admin'
}

mongoose.connect(databaseName, options).then(
  () => {
    console.log('connect successfully')
  },
  () => {
    console.log('connect error')
  }
)
