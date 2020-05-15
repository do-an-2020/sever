/* eslint-disable func-names */
/* eslint-disable no-underscore-dangle */
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import table from '../tableName'

const { Schema } = mongoose

const User = new Schema(
  {
    name: {
      type: String,
      // required: true,
    },
    email: {
      type: String,
      default: '',
    },
    phone: {
      type: String,
      default: '',
    },
    introduction: {
      type: String,
      default: '',
    },
    password: {
      type: String,
      default: '',
      required: true,
    },
    //   create_date: {
    //     type: Date,
    //     default: Date.now,
    //   },
    //   update_date: {
    //     type: Date,
    //     default: Date.now,
    //   },
    type: {
      type: String,
      required: true,
    },
    vendor: {
      type: Schema.Types.ObjectId,
      ref: table.vendor,
    },
    avatar: {
      type: String,
      default: null,
    },
    point: {
      type: Number,
      default: 0,
    },
    money: {
      type: Number,
      default: 0,
    },
    role: {
      type: Schema.Types.ObjectId,
      ref: table.role,
    },
    status: {
      type: Number,
      enum: [0, 1, 2, 3],
      default: 1,
    },
    device_token: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
)

// tạo methods để lấy ra id

User.methods.getId = function() {
  return this._id
}

User.methods.comparePassword = (passw, cb) => {
  bcrypt.compare(passw, this.password, (err, isMatch) => {
    if (err) {
      cb(err)
      return
    }
    cb(null, isMatch)
  })
}

// check password
User.methods.comparePasswordPromise = function(pass) {
  return new Promise(resolve => {
    bcrypt.compare(pass, this.password, (err, isMatch) => {
      if (err) {
        throw err
      }
      resolve(isMatch)
    })
  })
}

User.methods.bindJson = function() {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
    phone: this.phone,
    introduction: this.introduction,
    avatar: this.avatar,
    point: this.point,
    money: this.money,
    role: this.role,
    type: this.type,
    vendor: this.vendor,
  }
}

export function generateHash(user, callback) {
  const newUser = user
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      callback(err)
    }
    bcrypt.hash(user.password, salt, (err2, hash) => {
      if (err2) {
        callback(err2)
      }
      newUser.password = hash
      callback(null, newUser)
    })
  })
}

export const generateHashPromise = user => {
  const newUser = user
  return new Promise(resolve => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        throw err
      }
      bcrypt.hash(user.password, salt, (err2, hash) => {
        if (err2) {
          throw err2
        }
        newUser.password = hash
        resolve(newUser)
      })
    })
  })
}

export default User
