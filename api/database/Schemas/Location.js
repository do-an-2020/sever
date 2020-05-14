/* eslint-disable func-names */
/* eslint-disable no-underscore-dangle */
import mongoose from 'mongoose'
import table from '../tableName'

const { Schema } = mongoose

// thông tin bảng data của location
const LocationSchema = new Schema({
  // ten địa chỉ
  // ex: hanoi
  name: {
    type: String,
    default: '',
  },
  // tên hiển thị của địa chỉ
  // ex: Hà Nội
  display_name: {
    type: String,
    default: '',
  },
  // vị trí trên bản đồ
  lat: {
    type: Number,
    required: true,
  },
  long: {
    type: Number,
    required: true,
  },

  // vị trí nay thuộc vào parent nào
  parent: {
    type: mongoose.Types.ObjectId,
    ref: table.location,
  },

  vendor: {
    type: mongoose.Types.ObjectId,
    ref: table.vendor,
  },

  type: {
    type: String,
    enum: ['location', 'base_of_vendor'],
    required: true,
  },
  // mức độ của đia điểm
  /**
   * ví dụ:
   * Việt Nam: 1,
   * Hà Nội: 2,
   * Cầu Giầy: 3
   */
  level: {
    type: Number,
    enum: [1, 2, 3, 4, 5, 6],
  },
  status: {
    type: Number,
    default: 1,
    enum: [0, 1, 2],
  },
})

LocationSchema.methods.getFullJson = function() {
  return {
    id: this._id,
    name: this.name,
    display_name: this.display_name,
    lat: this.lat,
    long: this.long,
    level: this.level,
  }
}
// tạo methods để lấy ra id

LocationSchema.methods.getId = function() {
  return this._id
}

export default LocationSchema
