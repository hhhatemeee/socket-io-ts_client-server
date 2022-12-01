import { useContext } from 'react'

import { RoomContext } from '../context/RoomContext'

export const useSocket = () => useContext(RoomContext)
