import express from 'express'
// import http from 'http'
import bodyParser from 'body-parser'
import './database'
import passport from 'passport'
import multer from 'multer'
import setup from './database/passport_config'
import routers from './routes'

const upload = multer()
// import users from "./routes/users";
const path = require('path')

const app = express()

app.use(express.static(`${__dirname}/src`))
// for parsing application/json
app.use(bodyParser.json())
// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }))

// for parsing multipart/form-data
app.use(upload.array())
app.use(express.static('public'))
// app.use(express.json())
// app.use(express.urlencoded({ extended: false }))

app.get('/abc', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'src', 'app', 'index.jsx'))
})

app.use('/', routers)

app.use(passport.initialize())

setup(passport)

app.use((err, req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  // if (err.status === 401) {
  //   res.send({
  //     message: 'Không có quyền truy cập',
  //   })
  // }
  res.status(401).send({
    message: 'Không có quyền truy cập',
  })

  next()
})

app.listen(3000, () => {
  console.log(`Server is listening on port ${3000}`)
})
