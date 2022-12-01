import express from 'express'
import http from 'http'
import { Server } from 'socket.io'

import socket from './socket'
import { ServerType } from './types'

const app = express()

const server = http.createServer(app)

const io: ServerType = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
  },
})

app.get('/', (_, res) => {
  res.send('server is up running')
})

server.listen(8080, () => {
  console.log('Server listening')

  socket({ io })
})
