/* eslint-disable no-underscore-dangle */
/* eslint-disable func-names */
import mongoose from 'mongoose'
import table from '../tableName'

const { Schema } = mongoose

const Product = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: Array,
      default: [],
    },
    description: {
      type: String,
      default: '',
      required: true,
    },
    short_description: {
      type: String,
      default: '',
    },
    price: {
      type: Number,
      default: null,
    },
    statusPrice: {
      type: Number,
      enum: [0, 1],
      default: 1,
    },
    rate: {
      type: Number,
      max: 5,
      min: 0,
      default: 5,
    },
    total_review: {
      type: Number,
      default: 0,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: table.category,
    },
    vendor: {
      type: Schema.Types.ObjectId,
      ref: table.vendor,
      required: true,
    },
    react_count: {
      type: Number,
      default: 0,
    },
    status: {
      type: Number,
      enum: [0, 1, 2, 3],
      default: 1,
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
)

Product.methods.bindJson = function() {
  return {
    id: this._id,
    name: this.name,
    image: this.image,
    description: this.description,
    price: this.price,
    category: this.category,
    short_description: this.short_description,
    react_count: this.react_count,
    rate: this.rate,
    total_review: this.total_review,
  }
}

Product.methods.getId = function() {
  return this._id
}

Product.methods.getName = function() {
  return this.name
}

Product.methods.getImage = function() {
  return this.image
}

Product.methods.getDescription = function() {
  return this.description
}

Product.methods.getPrice = function() {
  return this.price
}

Product.methods.getCategory = function() {
  return this.category
}

Product.methods.getShortDescription = function() {
  return this.short_description
}

Product.methods.getReactCount = function() {
  return this.react_count
}

Product.methods.getRate = function() {
  return this.rate
}

Product.methods.getTotalReview = function() {
  return this.total_review
}

Product.methods.getStatus = function() {
  return this.status
}

export default Product
