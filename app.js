import express from 'express'
// import http from 'http'
import bodyParser from 'body-parser'
import './database'
import passport from 'passport'
import setup from './database/passport_config'
import routers from './routes'
// import users from "./routes/users";
const path = require('path')

const app = express()

app.use(express.static(`${__dirname}/src`))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// app.use("/users", users);

app.get('/abc', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'src', 'app', 'index.jsx'))
})

app.use('/', routers)

app.use(passport.initialize())

setup(passport)

app.listen(3000, () => {
  console.log(`Server is listening on port ${3000}`)
})
