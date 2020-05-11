import mongoose from 'mongoose'
import table from '../tableName'

const { Schema } = mongoose

// thông tin bảng data của location
const Location = new Schema({
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
})

export default Location
