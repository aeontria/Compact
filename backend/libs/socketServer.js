// const express = require('express');
// const http = require('http');
// const socketIO = require('socket.io');

// const app = express();
// const server = http.createServer(app);
// const io = socketIO(server, {
//   cors: { origin: "*" ,methods:['GET','POST']},
//   pingTimeout: 300000,
//   pingInterval: 50000,
//   transports: ['websocket']
// });
// const PORT = 3022;

// const chat = (message) => {
//   io.emit('out_chat', message);
// };

// io.on('connection', (socket) => {
//   socket.on('in_chat', (message) => {
//     chat(message);
//   });

//   socket.on('disconnect', () => {
//   });
// });

// server.listen(PORT, () => {
//   console.log('server')
// });

