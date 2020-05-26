/* eslint-disable no-underscore-dangle */
/* eslint-disable func-names */
import mongoose from 'mongoose'
import table from '../../../modules/chat/database/tablename'

const { Schema } = mongoose

const Room = new Schema(
  {
    users: {
      type: [
        {
          info: {
            type: Schema.Types.ObjectId,
            ref: table.user,
          },
          name: {
            type: String,
          },
        },
      ],
    },
    color: {
      type: String,
    },
    image: {
      type: String,
    },
    react: {
      type: String,
    },
    last_message: {
      type: Schema.Types.ObjectId,
      ref: table.message,
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
)

Room.methods.getId = function() {
  return this._id
}

Room.methods.getUsers = function() {
  return this.users
}

Room.methods.getImage = function() {
  return this.image
}

Room.methods.getColor = function() {
  return this.color
}

Room.methods.getReact = function() {
  return this.react
}

Room.methods.getCountUser = function() {
  return this.users?.lenght
}

Room.methods.getLastMessage = function(userId) {}

export default Room
