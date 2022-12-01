import { createContext, Dispatch, FC, ReactNode, SetStateAction, useEffect, useState } from 'react'
import socketIOClient from 'socket.io-client'
import { WS } from '../constants/api'

import { EVENTS_SERVER, EVENTS_CLIENT } from '../constants/events'
import { MessageType, RoomsType, SocketType } from '../types'

type RoomContextType = {
  ws: SocketType
  username: string
  setUsername: Dispatch<SetStateAction<string>>
  setMessages: Dispatch<SetStateAction<MessageType[]>>
  roomId?: string
  rooms: RoomsType
  messages: MessageType[]
}

export const RoomContext = createContext<RoomContextType>({} as RoomContextType)

const ws: SocketType = socketIOClient(WS)

type RoomProviderType = {
  children: ReactNode
}

export const RoomProvider: FC<RoomProviderType> = ({ children }) => {
  const [username, setUsername] = useState('')
  const [roomId, setRoomId] = useState('')
  const [rooms, setRooms] = useState<RoomsType>({})
  const [messages, setMessages] = useState<MessageType[]>([])

  useEffect(() => {
    window.onfocus = () => (document.title = 'Chat app')
  }, [])

  ws.on(EVENTS_SERVER.ROOMS, rooms => {
    setRooms(rooms)
  })

  ws.on(EVENTS_CLIENT.CONNECTION, rooms => {
    setRooms(rooms)
  })

  ws.on(EVENTS_SERVER.JOINED_ROOM, roomId => {
    setRoomId(roomId)
    setMessages([])
  })

  ws.on(EVENTS_SERVER.ROOM_MESSAGE, messages => {
    if (!document.hasFocus()) {
      document.title = 'New message...'
    }
    setMessages(messages)
  })

  return (
    <RoomContext.Provider
      value={{ ws, username, setUsername, rooms, messages, roomId, setMessages }}
    >
      {children}
    </RoomContext.Provider>
  )
}
