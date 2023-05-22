const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
const path = require('path');

const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

app.get('/', (req, res) => {
  res.sendFile(publicPath + '/index.html');
});

io.on('connection', (socket) => {
  io.emit('user connected', 'user a is connected');
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    msg = 'user disconnected';
    console.log(msg);
    io.emit('disc', msg);
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
