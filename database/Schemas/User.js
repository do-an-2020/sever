import mongoose from 'mongoose'
import table from '../tableName'

const { Schema } = mongoose

const Category = new Schema(
  {
    name: {
      type: String,
      required: true,
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
    //   create_date: {
    //     type: Date,
    //     default: Date.now,
    //   },
    //   update_date: {
    //     type: Date,
    //     default: Date.now,
    //   },
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
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
)

export default Category
