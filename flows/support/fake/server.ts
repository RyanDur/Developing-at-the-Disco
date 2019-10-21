import {Server, WebSocket} from 'mock-socket';

interface MockSocket {
  mockServer?: Server;
  socket?: WebSocket;
}

const sockets: MockSocket = {};

export function initServer() {
  for (const socket of Object.values(sockets)) {
    socket.close();
  }

  mockServer();
}

function mockServer() {
  sockets.mockServer = new Server('ws://localhost:3001');

  sockets.mockServer.on('connection', (socket: WebSocket) => {
    sockets.socket = socket;

    socket.send(JSON.stringify([{name: 'Ryan', id: 2}, {name: 'Jordan', id: 1}]));
  });
}
