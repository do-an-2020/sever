import mongoose from 'mongoose'

const { Schema } = mongoose

const Category = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    //   create_date: {
    //     type: Date,
    //     default: Date.now,
    //   },
    //   update_date: {
    //     type: Date,
    //     default: Date.now,
    //   },
    image: {
      type: String,
      default: null,
    },
    total_products: {
      type: Number,
      default: 0,
    },
    total_news: {
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

export default Category
