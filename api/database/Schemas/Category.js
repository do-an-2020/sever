/* eslint-disable func-names */
/* eslint-disable no-underscore-dangle */
import mongoose from 'mongoose'
import table from '../tableName'

const { Schema } = mongoose

const Category = new Schema(
  {
    // tên hiển thị
    name: {
      type: String,
      required: true,
    },
    // mô tả
    description: {
      type: String,
      default: '',
    },

    // ảnh default
    image: {
      type: String,
      default: null,
    },

    // người nhập
    submiter: {
      type: Schema.Types.ObjectId,
      ref: table.user,
    },

    // người xác nhận
    acepter: {
      type: Schema.Types.ObjectId,
      ref: table.user,
    },

    // tổng số product
    total_products: {
      type: Number,
      default: 0,
    },

    // tổng số bài viết
    total_news: {
      type: Number,
      default: 0,
    },

    // tổng số nhà cung cấp
    // đối chỉ đối với các category tổng
    total_vendor: {
      type: Number,
      default: 0,
    },

    // trạng thái
    status: {
      type: Number,
      enum: [0, 1, 2, 3],
      default: 1,
    },

    // category cha
    parent: {
      type: Schema.Types.ObjectId,
      ref: table.category,
    },

    // thuộc vàonhà cung cấp nào
    vendor: {
      type: Schema.Types.ObjectId,
      ref: table.vendor,
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
)

Category.methods.bindJson = function() {
  return {
    id: this._id,
    name: this.name,
    image: this.image,
    description: this.description,
    submiter: this.submiter,
    total_products: this.total_products,
    total_news: this.total_news,
    status: this.status,
  }
}

export default Category
