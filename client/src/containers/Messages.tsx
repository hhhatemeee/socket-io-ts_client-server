import { ChangeEvent, useState } from 'react'

import { EVENTS_CLIENT } from '../constants/events'
import { useSocket } from '../hooks/useSocket'

const Messages = () => {
  const { ws, messages, roomId, username, setMessages } = useSocket()
  const [value, setValue] = useState('')

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => setValue(e.target.value)

  const handleSendMessage = () => {
    if (!value.trim()) {
      return
    }

    if (roomId) {
      const date = new Date()

      ws.emit(EVENTS_CLIENT.SEND_ROOM_MESSAGE, { roomId, message: value, username })
      setMessages([
        ...(messages ? [...messages] : []),
        { username: 'You', message: value, time: `${date.getHours()}:${date.getMinutes()}` },
      ])
      setValue('')
    }
  }

  if (!roomId) {
    return <div></div>
  }

  return (
    <div>
      {messages?.map((message, index) => (
        <p key={index}>{message.message}</p>
      ))}

      <div>
        <textarea
          value={value}
          onChange={handleChange}
          placeholder='Tell us what you are thinking'
          rows={1}
        ></textarea>
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  )
}

export default Messages
