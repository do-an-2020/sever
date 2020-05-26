import mongoose from 'mongoose'
import { MessageSchema } from '../../../../api/database/Schemas'
import tablename from '../tablename'

const Message = mongoose.model(tablename.message, MessageSchema)

export const newMessage = async ({ room, user, text }) => {
  const data = await Message.insertMany([{ room, text, sender: user }])

  //   const user

  return {
    id: data[0]?.getId(),
    message: data[0]?.getText(),
    sender: data[0]?.getSender(),
    created_at: data[0]?.getCreatedAt(),
  }
}

export const test = () => {}
