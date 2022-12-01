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