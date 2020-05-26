/* eslint-disable no-underscore-dangle */
/* eslint-disable func-names */
import mongoose from 'mongoose'
import table from '../../../modules/chat/database/tablename'

const { Schema } = mongoose

const Message = new Schema(
  {
    room: {
      type: Schema.Types.ObjectId,
      ref: table.room,
    },
    text: {
      type: String,
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: table.user,
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
)

Message.methods.getId = function() {
  return this._id
}

Message.methods.getText = function() {
  return this.text
}

Message.methods.getSender = function() {
  return this.sender
}

Message.methods.getCreatedAt = function() {
  return this.created_at
}

export default Message
