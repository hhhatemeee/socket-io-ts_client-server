import { Server, Socket } from 'socket.io'

export const enum EVENTS_CLIENT {
  CONNECTION = 'connection',
  JOIN_ROOM = 'JOIN_ROOM',
  CREATE_ROOM = 'CREATE_ROOM',
  SEND_ROOM_MESSAGE = 'SEND_ROOM_MESSAGE',
}

export const enum EVENTS_SERVER {
  ROOMS = 'ROOMS',
  ROOM_MESSAGE = 'ROOM_MESSAGE',
  JOINED_ROOM = 'JOINED_ROOM',
}

export type MessageFromClient = Omit<MessageType, 'time'> & { roomId: string }

export type MessageType = {
  message: string
  username: string
  time: string
}

export type RoomsType = Record<string, { name: string }>

export type ServerType = Server<ServerToClientEvents, ClientToServerEvents, InterServerEvents>
export type SocketType = Socket<ServerToClientEvents, ClientToServerEvents>

export type ServerToClientEvents = {
  JOIN_ROOM: (roomId: string) => void
  SEND_ROOM_MESSAGE: (message: MessageFromClient) => void
  CREATE_ROOM: (room: { roomName: string }) => void
}

export type ClientToServerEvents = {
  JOINED_ROOM: (roomId: string) => void
  ROOM_MESSAGE: (messages: MessageType[]) => void
  ROOMS: (rooms: RoomsType) => void
}

export type InterServerEvents = { }
