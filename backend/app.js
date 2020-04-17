import express from 'express';
import http from 'http';
import socketIO from 'socket.io';

import index from './routes/index';

const port = process.env.PORT || 6969;
const app = express();

app.use(index);
const server = http.createServer(app);

const io = socketIO(server);

io.on("connection", (socket) => {
  console.log("New client connected");

  let clicks = 0;

  socket.on('areaClicked', (data) => {
    console.log("received click,", data);
    clicks += 1;
    socket.emit('updateGameSession', { clicks });
  });

  socket.on("disconnect", () => console.log("Client disconnected"));
});

server.listen(port, () => console.log(`Listening on port ${port}`));
