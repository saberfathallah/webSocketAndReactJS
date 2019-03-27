import express from 'express';
import socket from 'socket.io';

const app = express();

const server = app.listen(8080, () => {
  console.log('server is running on port 8080');
});

const io = socket(server);
io.on('connection', (sock) => {
  sock.on('send_message', (data) => {
    io.emit('recieve_message', data);
  });
});
