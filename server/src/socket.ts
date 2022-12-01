import { v4 as uuidV4 } from 'uuid'

import {
  RoomsType,
  MessageType,
  ServerType,
  EVENTS_CLIENT,
  SocketType,
  EVENTS_SERVER,
} from './types'

const rooms: RoomsType = {}
const messages: Record<string, MessageType[]> = {}

function socket({ io }: { io: ServerType }) {
  console.log('Sockets enabled')

  io.on(EVENTS_CLIENT.CONNECTION, (_socket: SocketType) => {
    console.log(`user connected ${_socket.id}`)

    _socket.on(EVENTS_CLIENT.CREATE_ROOM, ({ roomName }) => {
      console.log(roomName)
      const roomId = uuidV4()

      rooms[roomId] = {
        name: roomName,
      }

      _socket.join(roomId)

      _socket.broadcast.emit(EVENTS_SERVER.ROOMS, rooms)

      _socket.emit(EVENTS_SERVER.ROOMS, rooms)
      _socket.emit(EVENTS_SERVER.JOINED_ROOM, roomId)
      _socket.emit(EVENTS_SERVER.ROOM_MESSAGE, messages[roomId])
    })

    _socket.on(EVENTS_CLIENT.SEND_ROOM_MESSAGE, ({ roomId, message, username }) => {
      const date = new Date()
      const time = `${date.getHours()}:${date.getMinutes()}`
      const msgObj = { message, username, time }
      messages[roomId] = messages[roomId] ? [...messages[roomId], msgObj] : [msgObj]

      _socket.to(roomId).emit(EVENTS_SERVER.ROOM_MESSAGE, messages[roomId])
    })

    _socket.on(EVENTS_CLIENT.JOIN_ROOM, roomId => {
      _socket.join(roomId)
      _socket.emit(EVENTS_SERVER.JOINED_ROOM, roomId)

      console.log(messages[roomId])
      _socket.emit(EVENTS_SERVER.ROOM_MESSAGE, messages[roomId])
    })
  })
}

export default socket
