import mongoose from 'mongoose'
import tablename from '../tablename'
import table from '../../../../api/database/tableName'
import { UserSchema, RoomSchema } from '../../../../api/database/Schemas'

const Room = mongoose.model(tablename, RoomSchema)
const User = mongoose.model(table.user, UserSchema)

export const createNewRoom = ({ user }) => {
  const newUser = user.map(async i => {
    const findUser = await User.findById(i)
    return {
      info: i,
      name: findUser.bindJson().name,
    }
  })
  //   return {
  //       user
  //   }
}

export const getRoom = async id => {
  const room = await Room.findById(id).populate('user.info')
  return {
    id: room.getId(),
  }
}
