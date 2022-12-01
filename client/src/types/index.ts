import { Socket } from 'socket.io-client'

export type MessageType = {
  message: string
  username: string
  time: string
}

export type MessageFromClient = Omit<MessageType, 'time'> & { roomId: string }

export type RoomsType = Record<string, { name: string }>

export type SocketType = Socket<ClientToServerEvents, ServerToClientEvents>

export type ServerToClientEvents = {
  JOIN_ROOM: (roomId: string) => void
  SEND_ROOM_MESSAGE: (message: MessageFromClient) => void
  CREATE_ROOM: (room: { roomName: string }) => void
}

export type ClientToServerEvents = {
  JOINED_ROOM: (roomId: string) => void
  ROOM_MESSAGE: (messages: MessageType[]) => void
  ROOMS: (rooms: RoomsType) => void
  connection: (rooms: RoomsType) => void
}

export type InterServerEvents = {}
