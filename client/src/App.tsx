import { ChangeEvent, useEffect, useState } from 'react'

import RoomContainer from './containers/Rooms'
import MessagesContainer from './containers/Messages'

import { useSocket } from './hooks/useSocket'

function App() {
  const { setUsername, username } = useSocket()
  const [name, setName] = useState('')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)

  const handleSetUsername = () => {
    setUsername(name)
    localStorage.setItem('username', name)
  }

  useEffect(() => {
    setName(localStorage.getItem('username') || '')
  }, [])

  return (
    <div className='App'>
      {!username ? (
        <div>
          <input value={name} onChange={handleChange} />
          <button onClick={handleSetUsername}>Start message</button>
        </div>
      ) : (
        <>
          <RoomContainer />
          <MessagesContainer />
        </>
      )}
    </div>
  )
}

export default App
