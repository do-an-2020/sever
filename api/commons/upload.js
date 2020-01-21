import fs from 'fs'

const multer = require('multer')

const Storage = multer.diskStorage({
  destination(req, file, callback) {
    const date = new Date()
    const path = `../storage/images/${date.getDate()}_${date.getMonth()}_${date.getFullYear()}`
    if (!fs.existsSync('../storage')) {
      fs.mkdir('../storage', null, er1 => {
        if (er1) {
          callback(null, path)
        } else if (!fs.existsSync('../storage/images')) {
          fs.mkdir('../storage/images', null, er2 => {
            if (er2) {
              callback(null, path)
            } else if (!fs.existsSync(path))
              fs.mkdir(path, null, er3 => {
                if (er3) {
                  callback(null, path)
                } else {
                  callback(null, path)
                }
              })
          })
        }
      })
    } else if (!fs.existsSync('../storage/images')) {
      fs.mkdir('../storage/images', null, er2 => {
        if (er2) {
          callback(null, path)
        } else if (!fs.existsSync(path))
          fs.mkdir(path, null, er3 => {
            if (er3) {
              callback(null, path)
            } else {
              callback(null, path)
            }
          })
      })
    } else {
      console.log('TCL: destination -> path', path)
      if (!fs.existsSync(path)) {
        fs.mkdir(path, null, er3 => {
          if (er3) {
            callback(null, path)
          } else {
            callback(null, path)
          }
        })
      } else callback(null, path)
    }
  },
  filename(req, file, callback) {
    callback(null, `${file.fieldname}_${new Date().getTime()}_${file.originalname}`)
  },
})

const upload = multer({ storage: Storage })

export default upload
