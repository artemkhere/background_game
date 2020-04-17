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
  socket.emit("FromAPI", "You connected, brah.");

  socket.on('areaClicked', (data) => {
    console.log("received click,", data);
  });

  socket.on("disconnect", () => console.log("Client disconnected"));
});

server.listen(port, () => console.log(`Listening on port ${port}`));
