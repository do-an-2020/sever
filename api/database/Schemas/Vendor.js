/* eslint-disable no-underscore-dangle */
/* eslint-disable func-names */
import mongoose from 'mongoose'
import table from '../tableName'

const { Schema } = mongoose

const Vendor = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
      required: true,
    },
    base: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: table.location,
        },
      ],
      default: [],
    },

    status: {
      type: Number,
      enum: [0, 1, 2, 3],
      default: 1,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: table.category,
    },
    city: {
      type: Schema.Types.ObjectId,
      ref: table.location,
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
)

// tạo methods để lấy ra id

Vendor.methods.getId = function() {
  return this._id
}

Vendor.methods.getBase = function() {
  return this.base
}

Vendor.methods.getCategory = function() {
  return this.category
}

Vendor.methods.getCity = function() {
  return this.city
}

Vendor.methods.bindJson = function() {
  return {
    id: this._id,
    name: this.name,
    phone: this.phone,
    description: this.description,
    image: this.image,
    city: this.city,
    category: this.category,
    base: this.base,
  }
}

export default Vendor
