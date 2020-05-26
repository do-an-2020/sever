/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
import jwt from 'jsonwebtoken'
import { secretkey } from '../../../api/database/config'
import { newMessage } from '../database/method/Message'

const setupSocket = server => {
  const io = require('socket.io')(server)
  io.use(function(socket, next) {
    if (socket.handshake.query && socket.handshake.query.token) {
      jwt.verify(socket.handshake.query.token, secretkey, (err, decoded) => {
        if (err) {
          next(new Error('Authentication error'))
          return
        }
        socket.decoded = decoded
        next()
      })
    } else {
      next(new Error('Authentication error'))
    }
  }).on('connection', client => {
    console.log(`${client.decoded.id} connected`)

    client.on('join_room', params => {
      client.join(params.room)
    })

    client.on('send_message', async params => {
      console.log('params', params)
      const data = await newMessage({
        room: params.room,
        user: client.decoded.id,
        text: params.message,
      })
      client.in(params.room || 'test').emit('receive_message', { ...data, oldId: params.id })
    })

    client.on('disconnect', () => {
      console.log(`${client.decoded.id} disconnect`)
      // newClient.disconnect()
      // newClient = null
    })
  })
}

export default setupSocket
