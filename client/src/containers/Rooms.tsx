import { useRef } from 'react'

import { EVENTS_CLIENT } from '../constants/events'
import { useSocket } from '../hooks/useSocket'

const Rooms = () => {
  const { ws, roomId, rooms } = useSocket()
  const newRoomRef = useRef<HTMLInputElement>(null)

  const handleCreateRoom = () => {
    if (newRoomRef.current) {
      const roomName = newRoomRef.current.value

      ws.emit(EVENTS_CLIENT.CREATE_ROOM, { roomName })

      newRoomRef.current.value = ''
    }
  }

  const handleJoinRoom = (key: string) => {
    if (key === roomId) return

    ws.emit(EVENTS_CLIENT.JOIN_ROOM, key)
  }

  return (
    <nav>
      <div>
        <input ref={newRoomRef} placeholder='Room name' />
        <button onClick={handleCreateRoom}>Create Room</button>
      </div>
      {Object.keys(rooms).map(room => (
        <div key={room}>
          <button onClick={() => handleJoinRoom(room)} disabled={roomId === room}>
            {rooms[room].name}
          </button>
        </div>
      ))}
    </nav>
  )
}

export default Rooms
