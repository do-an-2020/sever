import express from 'express'
import { model } from 'mongoose'
import upload from '../../../../commons/upload'
import { RoomSchema, UserSchema, MessageSchema } from '../../../../database/Schemas'
import table from '../../../../database/tableName'
import { res200 } from '../../../../commons/cusResponse'

const Room = model(table.room, RoomSchema)
const User = model(table.user, UserSchema)
const Message = model(table.message, MessageSchema)

const router = express.Router()

router.post('/single_chat', upload.none(), async (req, res) => {
  const { user } = req.body
  const newUser = user.map(async i => {
    const findUser = await User.findById(i)
    return {
      info: i,
      name: findUser.bindJson().name,
    }
  })
  const result = await Room.insertMany({ user: newUser })
  res200(res, { id: result[0]?.getId() })
})

router.get('/:room', async (req, res) => {
  const { room } = req.params
  const data = await Message.find({ room })
    .sort({ created_at: -1 })
    .populate('sender')
  const newData = data.map(i => ({
    id: i.getId(),
    message: i.getText(),
    sender: i.getSender().bindJson(),
    created_at: i.getCreatedAt(),
  }))

  res200(res, newData)
})

export default router
