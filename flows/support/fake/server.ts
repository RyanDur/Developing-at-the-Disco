import {Server, WebSocket} from 'mock-socket';
window.WebSocket = WebSocket;
// const mockServer = new Server('ws://localhost:8888');
// import express from 'express';
// const app = express();
// const port = 8888;

export const initBackend = () => {
  // app.post('/users', (req, res) => res.send({name: req.body.name, id: 1}));
  // app.listen(port, () => console.log(`Example app listening on port ${port}!`))
  // mockServer.on('connection', (socket: WebSocket) => {
  //   socket.on('message', () => {
  //     return void 0;
  //   });
  //   socket.on('close', () => {
  //     return void 0;
  //   });
  //
  //   socket.send('message');
  //   socket.close();
  // });
};
